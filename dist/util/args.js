"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class Args {
    of(type) {
        if (type instanceof graphql_1.GraphQLList) {
            return this.of(type.ofType);
        }
        if (type instanceof graphql_1.GraphQLObjectType) {
            return Object.entries(type.getFields())
                .filter(([, field]) => field.isArg)
                .reduce((args, [name, field]) => (Object.assign({}, args, { [name]: {
                    sqlColumn: field.sqlColumn,
                    type: field.type instanceof graphql_1.GraphQLNonNull
                        ? field.type.ofType
                        : field.type
                } })), {});
        }
        return {};
    }
    sqlArgsOf(args, withFields) {
        return Object.entries(args)
            .reduce((sqlArgs, [name, value]) => (Object.assign({}, sqlArgs, { [withFields[name].sqlColumn || name]: value })), {});
    }
}
exports.Args = Args;
exports.default = new Args;
//# sourceMappingURL=args.js.map