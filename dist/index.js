"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLQueryType_1 = require("./lib/GraphQLQueryType");
exports.GraphQLQueryType = GraphQLQueryType_1.default;
const GraphQLInsertType_1 = require("./lib/GraphQLInsertType");
exports.GraphQLInsertType = GraphQLInsertType_1.default;
const GraphQLUpdateType_1 = require("./lib/GraphQLUpdateType");
exports.GraphQLUpdateType = GraphQLUpdateType_1.default;
const rootQuery = (ofQuery) => new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => (Object.assign({}, fields, { [name]: field.toObject() })), {})
});
const rootMutation = (ofMutation) => new graphql_1.GraphQLObjectType({
    name: 'RootMutation',
    fields: () => Object.entries(ofMutation).reduce((fields, [name, field]) => (Object.assign({}, fields, { [name]: field.toObject() })), {})
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
function default_1(schema, description = 'Powered by EnjoyMonster') {
    ;
    const query = rootQuery(schema.query);
    const mutation = rootMutation(schema.mutation);
    return new graphql_1.GraphQLSchema({ query, mutation, description });
}
exports.default = default_1;
__export(require("./lib/Relationship"));
//# sourceMappingURL=index.js.map