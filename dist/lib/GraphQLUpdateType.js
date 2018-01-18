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
const args_1 = require("../util/args");
const type_1 = require("../util/type");
const handle_1 = require("../util/handle");
const knex_1 = require("../util/knex");
class GraphQLUpdateType {
    constructor(config) {
        this.type = graphql_1.GraphQLInt;
        this.resolve = async (value, _a, ctx, info) => {
            var { newValue } = _a, args = __rest(_a, ["newValue"]);
            const knex = knex_1.knexOf(ctx, this.__sqlDatabase);
            const parsed = handle_1.default(this.__type, null, newValue, ctx, info);
            const target = args_1.default.sqlArgsOf(parsed, this.__originType.getFields());
            return knex(this.__sqlTable)
                .where(args_1.default.sqlArgsOf(args, this.__originType.getFields()))
                .update(parsed);
        };
        this.__type = config.type;
        this.__originType = type_1.default.originalTypeOf(config.type);
        this.__sqlTable = this.__originType._typeConfig.sqlTable;
        this.__sqlDatabase = this.__originType._typeConfig.sqlDatabase;
        const args = handle_1.thunk(config.args)(args_1.default.of(config.type));
        this.args = this.__newValueWith(args);
        this.description = config.description;
    }
    __newValueWith(args) {
        return Object.assign({}, args, { newValue: { type: type_1.default.inputTypeOf(this.__type, true) } });
    }
}
exports.default = GraphQLUpdateType;
//# sourceMappingURL=GraphQLUpdateType.js.map