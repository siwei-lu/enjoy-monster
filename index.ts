import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLList, GraphQLInt } from 'graphql';
import joinMonster from 'join-monster';

import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLInsertType from './lib/GraphQLInsertType';
import GraphQLUpdateType from './lib/GraphQLUpdateType';
import GraphQLObjectType from './lib/GraphQLObjectType';
import GraphQLDateTime from './extra/GraphQLDateTime';

const rootQuery = (ofQuery: { [name: string]: GraphQLQueryType }) =>
  new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object
      .entries(ofQuery)
      .reduce((fields, [name, field]) => ({
        ...fields, [name]: field.toObject()
      }), {})
  });

const rootMutation = (ofMutation: { [name: string]: GraphQLInsertType | GraphQLUpdateType  }) =>
  new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => Object.entries(ofMutation).reduce((fields, [name, field]) => ({
      ...fields, [name]: field.toObject()
    }), {})
  });

export default function (schema: any, description = 'Powered by EnjoyMonster') {;
  const query = rootQuery(schema.query);
  const mutation = rootMutation(schema.mutation);
  return new GraphQLSchema({ query, mutation, description });
}

export {
  GraphQLQueryType, GraphQLInsertType,
  GraphQLUpdateType, GraphQLObjectType,
  GraphQLDateTime
 }

export * from './lib/Relationship';
export * from './lib/GraphQLObjectType';
