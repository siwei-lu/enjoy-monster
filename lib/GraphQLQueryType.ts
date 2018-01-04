import { escape } from 'sqlstring';
import joinMonster from 'join-monster';

import { GraphQLObjectType, GraphQLFieldResolver, GraphQLFieldMap,
  GraphQLScalarType,
  GraphQLObjectTypeConfig, GraphQLList } from 'graphql';
import { resolve } from 'path';
import { arch, type } from 'os';

export type GraphQLQueryTypeConfig = {
  [ key: string ]: {
    type: GraphQLObjectType | GraphQLList<GraphQLObjectType>,
    args?: { [ name: string ]: {
      where?: { table: string, args: { [ name: string ]: any }, context: any },
      resolve?: GraphQLFieldResolver<any, any>
    } },
    // orderBy?: { [ name: string ]: 'asc' | 'desc' },
  }
}

export default class GraphQLQueryType {
  query: any;

  constructor(query: GraphQLQueryTypeConfig) {
    this.injectWhere(query);
    this.query = query;
  }

  injectWhere(toQuery: GraphQLQueryTypeConfig) {
    Object.keys(toQuery).map(key => {
      const value: any = toQuery[key];
      
      const type = value.type instanceof GraphQLList
        ? value.type.ofType
        : value.type;

      const args = type.args;
      const where = this.where(args);

      value.args = args;
      value.where = where;
    })
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

  

  static combined(...withQueries: GraphQLQueryType[]) {
    return new GraphQLQueryType(withQueries.reduce((combined, { query }) => ({
      ...combined, ...query
    }), {}));
  }
}