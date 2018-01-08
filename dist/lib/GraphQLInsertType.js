"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
class GraphQLInsertType {
    constructor(config) {
        const type = config.type instanceof graphql_1.GraphQLObjectType
            ? config.type
            : config.type.ofType;
        const fields = type.getFields();
        this.__name = config.name;
        this.__sqlTable = type._typeConfig.sqlTable;
        this.__schemaName = type.name;
        this.__type = config.type;
        this.__inputType = this.inputType(this.__type);
        this.__handler = Object.entries(fields).reduce((handler, [name, { sqlColumn, handle }]) => (Object.assign({}, handler, { [name]: { sqlColumn, handle } })), {});
    }
    resolver() {
        return async (value, { [this.__name]: args }, { knex }) => {
            const parsedArgs = this.__handleArgs(args);
            return await knex(this.__sqlTable).insert(parsedArgs);
        };
    }
    inputType(ofType) {
        if (ofType instanceof graphql_1.GraphQLObjectType) {
            const name = `${ofType.name}InputType`;
            let input = GraphQLInsertType.graphQLinputTypes[name];
            if (!input) {
                input = new graphql_2.GraphQLInputObjectType({
                    name,
                    fields: () => Object.entries(ofType.getFields())
                        .reduce((fields, _a) => {
                        var [name, _b] = _a, { type } = _b, field = __rest(_b, ["type"]);
                        return (Object.assign({}, fields, { [name]: { type: this.inputType(type) } }));
                    }, {})
                });
                GraphQLInsertType.graphQLinputTypes[name] = input;
            }
            return input;
        }
        if (ofType instanceof graphql_2.GraphQLNonNull) {
            return new graphql_2.GraphQLNonNull(this.inputType(ofType.ofType));
        }
        if (ofType instanceof graphql_2.GraphQLList) {
            return new graphql_2.GraphQLList(this.inputType(ofType.ofType));
        }
        return ofType;
    }
    toObject() {
        const t = {
            type: graphql_2.GraphQLInt,
            description: this.__description,
            resolve: this.resolver().bind(this),
            args: {
                [this.__name]: { type: this.inputType(this.__type) }
            }
        };
        return t;
    }
    __handleArgs(args) {
        const result = {};
        Object.entries(args).forEach(([name, value]) => {
            value = this.__handler[name].handle ? this.__handler[name].handle(value) : value;
            name = this.__handler[name].sqlColumn || name;
            result[name] = value;
        });
        return result;
    }
}
GraphQLInsertType.graphQLinputTypes = [];
exports.default = GraphQLInsertType;
//# sourceMappingURL=GraphQLInsertType.js.map