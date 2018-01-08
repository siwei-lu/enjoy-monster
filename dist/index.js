"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLQueryType_1 = require("./lib/GraphQLQueryType");
exports.GraphQLQueryType = GraphQLQueryType_1.default;
// const addCounter = (toQuery: { [name: string]: GraphQLQueryType }) => {
//   Object.entries(toQuery).forEach(([name, field]) => {
//     if (!(field.type instanceof GraphQLList)) return true;
//     toQuery[`${name}__count`] = new GraphQLQueryType({ ...GraphQLInt, sqlTable: field., 
//       () => field.arguments);
//   })
// };
const rootQuery = (ofQuery) => new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: () => Object.entries(ofQuery).reduce((fields, [name, field]) => (Object.assign({}, fields, { [name]: field.toObject() })), {})
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
    return new graphql_1.GraphQLSchema({ query, description });
}
exports.default = default_1;
__export(require("./lib/Relationship"));
//# sourceMappingURL=index.js.map