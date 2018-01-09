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
class GraphQLUpdateType {
    constructor(config) {
        this.__resolve = async (value, _a, { knex }, info) => {
            var { newValue } = _a, args = __rest(_a, ["newValue"]);
            return knex(this.__sqlTable)
                .where(args_1.default.sqlArgsOf(args, this.__fields))
                .update(args_1.default.sqlArgsOf(newValue, this.__fields));
        };
        this.__name = config.name;
        this.__type = config.type;
        this.__args = (config.args || (e => e))(args_1.default.of(config.type));
        this.__originType = type_1.default.originalTypeOf(config.type);
        this.__sqlTable = this.__originType._typeConfig.sqlTable;
        this.__fields = this.__originType.getFields();
        this.__injectNewValueToArgs();
    }
    __injectNewValueToArgs() {
        this.__args.newValue = { type: type_1.default.inputTypeOf(this.__type, true) };
    }
    toObject() {
        return {
            name: this.__name,
            type: graphql_1.GraphQLInt,
            args: this.__args,
            resolve: this.__resolve
        };
    }
}
exports.default = GraphQLUpdateType;
//# sourceMappingURL=GraphQLUpdateType.js.map