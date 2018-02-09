import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLList, GraphQLInt } from 'graphql';
import joinMonster from 'join-monster';

import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLInsertType from './lib/GraphQLInsertType';
import GraphQLUpdateType from './lib/GraphQLUpdateType';
import GraphQLObjectType from './lib/GraphQLObjectType';

const queryOf = (queries: any) =>
  new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => queries
  });

const mutationOf = (mutations: any) =>
  new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => mutations
  });

export default function (schema: any, description = 'Powered by EnjoyMonster') {
  const query = queryOf(schema.query);
  const mutation = mutationOf(schema.mutation);
  const config: any = { query, mutation, description };
  return new GraphQLSchema(config);
}

export {
  GraphQLQueryType,
  GraphQLInsertType,
  GraphQLUpdateType,
  GraphQLObjectType,
};

export * from './lib/Relationship';
export * from './lib/GraphQLObjectType';
