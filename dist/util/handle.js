"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLObjectType_1 = require("../lib/GraphQLObjectType");
const returnSelf = self => self;
exports.thunk = handle => value => (handle || returnSelf)(value);
exports.callHandle = handle => (value, args, context, info) => handle ? handle(value, args, context, info) : value;
function handle(type, parent, args, context, info) {
    if (!parent) {
        parent = args;
    }
    if (type instanceof graphql_1.GraphQLList) {
        return parent.map(value => handle(type.ofType, value, args, context, info));
    }
    if (type instanceof graphql_1.GraphQLNonNull) {
        return handle(type.ofType, parent, args, context, info);
    }
    if (type instanceof GraphQLObjectType_1.default) {
        const result = {};
        Object.entries(type.getFields())
            .filter(([name]) => parent[name])
            .forEach(([name, field]) => {
            const value = field.type instanceof graphql_1.GraphQLScalarType
                ? parent[name]
                : handle(field.type, parent[name], args, context, info);
            result[name] = exports.callHandle(field.handle)(value, args, context, info);
        });
        return result;
    }
    return parent;
}
exports.default = handle;
//# sourceMappingURL=handle.js.map