import { escape } from 'sqlstring';
import joinMonster from 'join-monster';
import * as Knex from 'knex';

import {
  GraphQLObjectType, GraphQLFieldResolver, GraphQLFieldMap,
  GraphQLScalarType, GraphQLObjectTypeConfig, GraphQLList,
  GraphQLResolveInfo,
  GraphQLNonNull
} from 'graphql';

export type QueryType = GraphQLScalarType | GraphQLObjectType | GraphQLList<GraphQLObjectType>;
export type ArgumentType = { [name: string]: QueryType };
export type WhereType = (talbe: string, args: {}, context: any) => string;
export type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;

const resolve = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => {
  return joinMonster(resolveInfo, context, async sql => (await context.knex.raw(sql))[0],
  { dialect: 'mysql' });
};

export default class GraphQLQueryType {
  private __type: QueryType;
  private __where: WhereType;
  private __args: ArgumentType;
  private __resolve: ResolveType;

  constructor(type: QueryType, args?: (defaultArgs: ArgumentType) => ArgumentType) {
    const defaultArgs = this.args(type);

    this.__type = type;
    this.__args = args ? args(defaultArgs) : defaultArgs;
    this.__where = this.where(this.__args);
    this.__resolve = resolve;
  }

  args(ofType: QueryType) {
    const current = ofType instanceof GraphQLList ? ofType.ofType : ofType;

    if (current instanceof GraphQLScalarType) return {};

    return Object
      .entries<any>(current.getFields())
      .filter(([_, field]) => field.isArg)
      .reduce((args, [name, field]) => ({
        ...args, [name]: {
          type: field.type instanceof GraphQLNonNull ? field.type.ofType : field.type,
          sqlColumn: field.sqlColumn }
      }), {});
  }

  where(withArgs: any) {
    return (table, params) => {
      const conditions = {};
      Object.keys(withArgs).forEach(key => {
        const val = params[key];
        if (val === null || val === undefined) return true;

        const sqlColumn = withArgs[key].sqlColumn || key;
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

  toObject() {
    return {
      type: this.__type,
      args: this.__args,
      where: this.__where,
      resolve: this.__resolve
    }
  }
}