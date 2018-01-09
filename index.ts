import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import joinMonster from 'join-monster';
import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLInsertType from './lib/GraphQLInsertType';
import GraphQLUpdateType from './lib/GraphQLUpdateType';

const rootQuery = (ofQuery: { [name: string]: GraphQLQueryType }) =>
  new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => ({
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

// function rootMutation(ofMutaion, withKnex: Knex) {
//   const test = Object.entries(ofMutaion)
//   .reduce((field, [name, mutation]) => ({
//     ...field, [name]: mutation.toObject(withKnex)
//   }), {});
//   return new GraphQLObjectType({
//     name: 'RootMutation',
//     fields: () => test 
//   });
// }

export default function (schema: any, description = 'Powered by EnjoyMonster') {;
  const query = rootQuery(schema.query);
  const mutation = rootMutation(schema.mutation);
  return new GraphQLSchema({ query, mutation, description });
}

export { GraphQLQueryType, GraphQLInsertType, GraphQLUpdateType }

export * from './lib/Relationship';