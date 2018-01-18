"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLObjectType_1 = require("../lib/GraphQLObjectType");
const returnSelf = self => self;
exports.thunk = handle => value => (handle || returnSelf)(value);
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
            if (field.type instanceof graphql_1.GraphQLScalarType) {
                result[name] = exports.thunk(field.handle)(parent[name]);
            }
            else {
                result[name] = exports.thunk(field.handle)(handle(field.type, parent[name], args, context, info));
            }
        });
        return result;
    }
    return parent;
}
exports.default = handle;
//# sourceMappingURL=handle.js.map