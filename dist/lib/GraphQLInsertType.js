"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const type_1 = require("../util/type");
const args_1 = require("../util/args");
const knex_1 = require("../util/knex");
const handle_1 = require("../util/handle");
class GraphQLInsertType {
    constructor(config) {
        this.type = graphql_1.GraphQLInt;
        this.resolve = async (value, { [this.__argName]: args }, ctx, info) => {
            const knex = knex_1.knexOf(ctx, this.__sqlDatabase);
            const parsed = handle_1.default(this.__type, null, args, ctx, info);
            const target = args_1.default.sqlArgsOf(parsed, this.__originType.getFields());
            return await knex(this.__sqlTable).insert(target);
        };
        this.__originType = type_1.default.originalTypeOf(config.type);
        this.__argName = config.argName;
        this.__sqlTable = this.__originType._typeConfig.sqlTable;
        this.__sqlDatabase = this.__originType._typeConfig.sqlDatabase;
        this.__schemaName = this.__originType.name;
        this.__type = config.type;
        this.description = config.description;
        this.args = {
            [this.__argName]: { type: type_1.default.inputTypeOf(this.__type) }
        };
    }
}
exports.default = GraphQLInsertType;
//# sourceMappingURL=GraphQLInsertType.js.map