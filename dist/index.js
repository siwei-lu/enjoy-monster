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
const GraphQLObjectType_1 = require("./lib/GraphQLObjectType");
exports.GraphQLObjectType = GraphQLObjectType_1.default;
const GraphQLDateTime_1 = require("./extra/GraphQLDateTime");
exports.GraphQLDateTime = GraphQLDateTime_1.default;
const rootQueryOf = (queries) => new GraphQLObjectType_1.default({
    name: 'RootQuery',
    fields: () => queries
});
const rootMutation = (ofMutation) => new GraphQLObjectType_1.default({
    name: 'RootMutation',
    fields: () => Object.entries(ofMutation).reduce((fields, [name, field]) => (Object.assign({}, fields, { [name]: field.toObject() })), {})
});
function default_1(schema, description = 'Powered by EnjoyMonster') {
    ;
    const query = rootQueryOf(schema.query);
    const mutation = rootMutation(schema.mutation);
    const config = { query, mutation, description };
    return new graphql_1.GraphQLSchema(config);
}
exports.default = default_1;
__export(require("./lib/Relationship"));
__export(require("./lib/GraphQLObjectType"));
//# sourceMappingURL=index.js.map