"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const type_1 = require("../util/type");
class GraphQLInsertType {
    constructor(config) {
        this.type = graphql_2.GraphQLInt;
        this.resolve = async (value, { [this.__argName]: args }, { knex }) => {
            const parsedArgs = this.__handle(args);
            return await knex(this.__sqlTable).insert(parsedArgs);
        };
        const type = config.type instanceof graphql_1.GraphQLObjectType
            ? config.type
            : config.type.ofType;
        const fields = type.getFields();
        this.__argName = config.argName;
        this.__sqlTable = type._typeConfig.sqlTable;
        this.__schemaName = type.name;
        this.__type = config.type;
        this.__handler = Object.entries(fields).reduce((handler, [name, { sqlColumn, handle }]) => (Object.assign({}, handler, { [name]: { sqlColumn, handle } })), {});
        this.name = config.name;
        this.description = config.description;
        this.args = {
            [this.__argName]: { type: type_1.default.inputTypeOf(this.__type) }
        };
    }
    __handle(args) {
        const result = {};
        Object.entries(args).forEach(([name, value]) => {
            value = this.__handler[name].handle ? this.__handler[name].handle(value) : value;
            name = this.__handler[name].sqlColumn || name;
            result[name] = value;
        });
        return result;
    }
}
exports.default = GraphQLInsertType;
//# sourceMappingURL=GraphQLInsertType.js.map