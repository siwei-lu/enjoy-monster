import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import joinMonster from 'join-monster';
import GraphQLQueryType from './lib/GraphQLQueryType';

function rootQuery(ofQuery: { [name: string]: GraphQLQueryType }) {
  return new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => ({
      ...fields, [name]: field.toObject()
    }), {})
  });
}

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

export default function (schema: any, description = 'Powered by EnjoyMonster') {
  const query = rootQuery(schema.query);
  return new GraphQLSchema({ query, description });
}

export { GraphQLQueryType }