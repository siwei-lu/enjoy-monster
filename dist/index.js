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
const queryOf = (queries) => new GraphQLObjectType_1.default({
    name: 'RootQuery',
    fields: () => queries
});
const mutationOf = (mutations) => new GraphQLObjectType_1.default({
    name: 'RootMutation',
    fields: () => mutations
});
function default_1(schema, description = 'Powered by EnjoyMonster') {
    ;
    const query = queryOf(schema.query);
    const mutation = mutationOf(schema.mutation);
    const config = { query, mutation, description };
    return new graphql_1.GraphQLSchema(config);
}
exports.default = default_1;
__export(require("./lib/Relationship"));
__export(require("./lib/GraphQLObjectType"));
//# sourceMappingURL=index.js.map