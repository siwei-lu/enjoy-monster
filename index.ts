import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap, GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql';
import joinMonster from 'join-monster';
import GraphQLQueryType from './lib/GraphQLQueryType';

// const addCounter = (toQuery: { [name: string]: GraphQLQueryType }) => {
//   Object.entries(toQuery).forEach(([name, field]) => {
//     if (!(field.type instanceof GraphQLList)) return true;

//     toQuery[`${name}__count`] = new GraphQLQueryType({ ...GraphQLInt, sqlTable: field., 
//       () => field.arguments);
//   })
// };

const rootQuery = (ofQuery: { [name: string]: GraphQLQueryType }) =>
  new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => ({
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
  return new GraphQLSchema({ query, description });
}

export { GraphQLQueryType }

export * from './lib/Relationship';