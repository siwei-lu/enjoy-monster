"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const type_1 = require("../util/type");
class GraphQLInsertType {
    __handle(args) {
        const result = {};
        Object.entries(args).forEach(([name, value]) => {
            value = this.__handler[name].handle ? this.__handler[name].handle(value) : value;
            name = this.__handler[name].sqlColumn || name;
            result[name] = value;
        });
        return result;
    }
    constructor(config) {
        const type = config.type instanceof graphql_1.GraphQLObjectType
            ? config.type
            : config.type.ofType;
        const fields = type.getFields();
        this.__name = config.name;
        this.__sqlTable = type._typeConfig.sqlTable;
        this.__schemaName = type.name;
        this.__type = config.type;
        this.__handler = Object.entries(fields).reduce((handler, [name, { sqlColumn, handle }]) => (Object.assign({}, handler, { [name]: { sqlColumn, handle } })), {});
    }
    resolver() {
        return async (value, { [this.__name]: args }, { knex }) => {
            const parsedArgs = this.__handle(args);
            return await knex(this.__sqlTable).insert(parsedArgs);
        };
    }
    toObject() {
        return {
            type: graphql_2.GraphQLInt,
            description: this.__description,
            resolve: this.resolver().bind(this),
            args: {
                [this.__name]: { type: type_1.default.inputTypeOf(this.__type) }
            }
        };
    }
}
exports.default = GraphQLInsertType;
//# sourceMappingURL=GraphQLInsertType.js.map