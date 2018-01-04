import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap as FieldMap } from 'graphql';
import joinMonster from 'join-monster';

import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLObjectType from './lib/GraphQLObjectType';
import GraphQLInsertType from './lib/GraphQLInsertType';

export type GraphQLFieldMap<TSource, TContext> = FieldMap<TSource, TContext> & {
  type: { ofType: any }
}

function __injectResolve(toQuery: GraphQLQueryType, withKnex: Knex) {
  const resolve = (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, context,
      async sql => (await withKnex.raw(sql))[0],
      { dialect: 'mysql' }
    );
  };

  Object.values(toQuery.query).forEach(item => item.resolve = resolve);
}

function __rootQuery(ofQuery: GraphQLQueryType) {
  return new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ofQuery.query
  });
}

function __rootMutation(ofMutaion, withKnex: Knex) {
  const test = Object.entries(ofMutaion)
  .reduce((field, [name, mutation]) => ({
    ...field, [name]: mutation.toObject(withKnex)
  }), {});
  return new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => test 
  });
}

export default function (dbConfig: Knex.Config, schema: any,
  description: string = 'Powered by EnjoyMonster') {

  const knex = Knex(dbConfig);

  __injectResolve(schema.query, knex);

  const query = __rootQuery(schema.query);
  const mutation = __rootMutation(schema.mutation, knex);

  return new GraphQLSchema({ query, mutation });
}

export { GraphQLQueryType, GraphQLObjectType, GraphQLInsertType }

export { GraphQLString } from 'graphql';