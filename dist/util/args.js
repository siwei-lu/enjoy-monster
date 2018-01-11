"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLObjectType_1 = require("../lib/GraphQLObjectType");
class Args {
    of(type) {
        if (type instanceof graphql_1.GraphQLList) {
            return Object.assign({}, this.of(type.ofType), this.sortArgs());
        }
        if (type instanceof GraphQLObjectType_1.default) {
            return type.args;
        }
        return {};
    }
    sqlArgsOf(args, withFields) {
        return Object.entries(args)
            .reduce((sqlArgs, [name, value]) => (Object.assign({}, sqlArgs, { [withFields[name].sqlColumn || name]: value })), {});
    }
    sortArgs() {
        return {
            __sort: {
                type: graphql_1.GraphQLString,
                resolve: (table, params) => {
                    return `ORDER BY ${params}`;
                }
            }
        };
    }
}
exports.Args = Args;
exports.default = new Args;
//# sourceMappingURL=args.js.map