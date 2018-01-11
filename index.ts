import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLList, GraphQLInt } from 'graphql';
import joinMonster from 'join-monster';

import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLInsertType from './lib/GraphQLInsertType';
import GraphQLUpdateType from './lib/GraphQLUpdateType';
import GraphQLObjectType from './lib/GraphQLObjectType';
import GraphQLDateTime from './extra/GraphQLDateTime';

const rootQueryOf = (queries: any) =>
  new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => queries
  });

const rootMutation = (ofMutation: { [name: string]: GraphQLInsertType | GraphQLUpdateType  }) =>
  new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => Object.entries(ofMutation).reduce((fields, [name, field]) => ({
      ...fields, [name]: field.toObject()
    }), {})
  });

export default function (schema: any, description = 'Powered by EnjoyMonster') {;
  const query = rootQueryOf(schema.query);
  const mutation = rootMutation(schema.mutation);
  const config: any = { query, mutation, description };
  return new GraphQLSchema(config);
}

export {
  GraphQLQueryType, GraphQLInsertType,
  GraphQLUpdateType, GraphQLObjectType,
  GraphQLDateTime
 }

export * from './lib/Relationship';
export * from './lib/GraphQLObjectType';
