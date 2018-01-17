import { escape } from 'sqlstring';
import joinMonster from 'join-monster';
import * as Knex from 'knex';

import {
  GraphQLObjectType, GraphQLFieldResolver, GraphQLFieldMap,
  GraphQLScalarType, GraphQLObjectTypeConfig, GraphQLList,
  GraphQLResolveInfo,
  GraphQLNonNull,
  GraphQLOutputType
} from 'graphql';

import argsUtil, { ArgumentType } from '../util/args';
import typeUtil from '../util/type';
import { knexOf } from '../util/knex';


export type WhereType = (talbe: string, args: {}, context: any) => string;
export type OrderByType = (args: any) => { [name: string]: 'DESC' | 'ASC'}
export type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;

const resolve = (parent, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => {
  const type = typeUtil.originalTypeOf(resolveInfo.returnType);
  const knex = knexOf(context, type._typeConfig.sqlDatabase);
  return joinMonster(resolveInfo, context, async sql => (await knex.raw(sql))[0],
  { dialect: 'mysql' });
};

export default class GraphQLQueryType {
   type: GraphQLOutputType;
   where: WhereType;
   args: ArgumentType;
   resolve: ResolveType;
   orderBy = args => {
    if (!args.__sort) return null;

    const [key, value] = args.__sort.split(' ');
    return {
      [key]: value.toUpperCase()
    }
   };

  constructor(type: GraphQLOutputType, args = (args: ArgumentType) => args) {
    this.type = type;
    this.args = args(argsUtil.of(type));
    this.where = this.whereWith(this.args);
    this.resolve = resolve;
  }

  whereWith(args: any) {
    return (table, params) => {
      const conditions = {};

      const [resolver, condition] = Object.entries(params)
        .reduce((sum, [key, value]) => {
          if (args[key].resolve) {
            sum[0].push({ key, value });
          } else {
            sum[1].push({ key, value });
          }
          return sum;
        }, [[], []]);

      condition.forEach(({ key, value }) => {
        const { sqlColumn } = args[key];
        conditions[sqlColumn || key] = value;
      });

      let clause = '1=1';

      Object.keys(conditions).forEach(key => {
        const val = conditions[key];
        if (val === null || val === undefined) return;

        if (val instanceof Array) {
          clause += ` and ${table}.${key} in ${escape(val)}`
        } else {
          clause += ` and ${table}.${key} = ${escape(val)}`
        }
      });

      resolver.forEach(({ key, value }) => {
        clause += ` ${args[key].resolve(table, value)}`;
      })

      return clause;
    }
  }
}