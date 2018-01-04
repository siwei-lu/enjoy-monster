"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLQueryType_1 = require("./lib/GraphQLQueryType");
exports.GraphQLQueryType = GraphQLQueryType_1.default;
function rootQuery(ofQuery) {
    return new graphql_1.GraphQLObjectType({
        name: 'RootQuery',
        fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => (Object.assign({}, fields, { [name]: field.toObject() })), {})
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
function default_1(schema, description = 'Powered by EnjoyMonster') {
    const query = rootQuery(schema.query);
    return new graphql_1.GraphQLSchema({ query, description });
}
exports.default = default_1;
