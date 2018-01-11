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


export type WhereType = (talbe: string, args: {}, context: any) => string;
export type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;

const resolve = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => {
  return joinMonster(resolveInfo, context, async sql => (await context.knex.raw(sql))[0],
  { dialect: 'mysql' });
};

export default class GraphQLQueryType {
  private __type: GraphQLOutputType;
  private __where: WhereType;
  private __args: ArgumentType;
  private __resolve: ResolveType;

  constructor(type: GraphQLOutputType, args = (args: ArgumentType) => args) {
    this.__type = type;
    this.__args = args(argsUtil.of(type));
    this.__where = this.whereWith(this.__args);
    this.__resolve = resolve;

    this.__setEnumableGetter();
  }

  whereWith(args: any) {
    return (table, params) => {
      const conditions = {};
      Object.keys(args).forEach(key => {
        const val = params[key];
        if (val === null || val === undefined) return true;

        const sqlColumn = args[key].sqlColumn || key;
        conditions[sqlColumn] = val;
      })

      let clause = '1=1';

      Object.keys(conditions).forEach(key => {
        const val = conditions[key];
        if (val === null || val === undefined) return true;

        if (val instanceof Array) {
          clause += ` and ${table}.${key} in ${escape(val)}`
        } else {
          clause += ` and ${table}.${key} = ${escape(val)}`
        }
      });

      clause += ';';
      return clause;
    }
  }

  private __setEnumableGetter() {
    const getters =['type', 'where', 'args', 'resolve']
      .reduce((sum, name) => ({
        ...sum,
        [name]: {
          get() { return this[`__${name}`]},
          enumerable: true
        }
      }), {});
    Object.defineProperties(this, { ...getters });
  }
}