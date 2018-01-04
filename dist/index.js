"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const graphql_1 = require("graphql");
const join_monster_1 = require("join-monster");
const GraphQLQueryType_1 = require("./lib/GraphQLQueryType");
exports.GraphQLQueryType = GraphQLQueryType_1.default;
const GraphQLObjectType_1 = require("./lib/GraphQLObjectType");
exports.GraphQLObjectType = GraphQLObjectType_1.default;
const GraphQLInsertType_1 = require("./lib/GraphQLInsertType");
exports.GraphQLInsertType = GraphQLInsertType_1.default;
function __injectResolve(toQuery, withKnex) {
    const resolve = (parent, args, context, resolveInfo) => {
        return join_monster_1.default(resolveInfo, context, async (sql) => (await withKnex.raw(sql))[0], { dialect: 'mysql' });
    };
    Object.values(toQuery.query).forEach(item => item.resolve = resolve);
}
function __rootQuery(ofQuery) {
    return new GraphQLObjectType_1.default({
        name: 'RootQuery',
        fields: () => ofQuery.query
    });
}
function __rootMutation(ofMutaion, withKnex) {
    const test = Object.entries(ofMutaion)
        .reduce((field, [name, mutation]) => (Object.assign({}, field, { [name]: mutation.toObject(withKnex) })), {});
    return new GraphQLObjectType_1.default({
        name: 'RootMutation',
        fields: () => test
    });
}
function default_1(dbConfig, schema, description = 'Powered by EnjoyMonster') {
    const knex = Knex(dbConfig);
    __injectResolve(schema.query, knex);
    const query = __rootQuery(schema.query);
    const mutation = __rootMutation(schema.mutation, knex);
    return new graphql_1.GraphQLSchema({ query, mutation });
}
exports.default = default_1;
var graphql_2 = require("graphql");
exports.GraphQLString = graphql_2.GraphQLString;
