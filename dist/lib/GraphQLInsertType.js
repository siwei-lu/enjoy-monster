"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const type_1 = require("../util/type");
const knex_1 = require("../util/knex");
class GraphQLInsertType {
    constructor(config) {
        this.type = graphql_2.GraphQLInt;
        this.resolve = async (value, { [this.__argName]: args }, ctx) => {
            const knex = knex_1.knexOf(ctx, this.__sqlDatabase);
            const parsedArgs = this.__handle(args, ctx);
            return await knex(this.__sqlTable).insert(parsedArgs);
        };
        const type = config.type instanceof graphql_1.GraphQLObjectType
            ? config.type
            : config.type.ofType;
        const fields = type.getFields();
        this.__argName = config.argName;
        this.__sqlTable = type._typeConfig.sqlTable;
        this.__sqlDatabase = type._typeConfig.sqlDatabase;
        this.__schemaName = type.name;
        this.__type = config.type;
        this.__handler = Object.entries(fields)
            .reduce((handler, [name, { sqlColumn, handle }]) => (Object.assign({}, handler, { [name]: { sqlColumn, handle } })), {});
        this.description = config.description;
        this.args = {
            [this.__argName]: { type: type_1.default.inputTypeOf(this.__type) }
        };
    }
    __handle(args, ctx) {
        const result = {};
        Object.entries(args).forEach(([name, value]) => {
            value = this.__handler[name].handle ? this.__handler[name].handle(value, ctx) : value;
            name = this.__handler[name].sqlColumn || name;
            result[name] = value;
        });
        return result;
    }
}
exports.default = GraphQLInsertType;
//# sourceMappingURL=GraphQLInsertType.js.map