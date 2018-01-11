"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const join_monster_1 = require("join-monster");
const args_1 = require("../util/args");
const resolve = (parent, args, context, resolveInfo) => {
    return join_monster_1.default(resolveInfo, context, async (sql) => (await context.knex.raw(sql))[0], { dialect: 'mysql' });
};
class GraphQLQueryType {
    constructor(type, args = (args) => args) {
        this.type = type;
        this.args = args(args_1.default.of(type));
        this.where = this.whereWith(this.args);
        this.resolve = resolve;
    }
    whereWith(args) {
        return (table, params) => {
            const conditions = {};
            const [resolver, condition] = Object.entries(params)
                .reduce((sum, [key, value]) => {
                if (args[key].resolve) {
                    sum[0].push({ key, value });
                }
                else {
                    sum[1].push({ key, value });
                }
                return sum;
            }, [[], []]);
            condition.forEach(({ key, value }) => {
                const { sqlColumn } = args(key);
                conditions[sqlColumn || key] = value;
            });
            let clause = '1=1';
            Object.keys(conditions).forEach(key => {
                const val = conditions[key];
                if (val === null || val === undefined)
                    return;
                if (val instanceof Array) {
                    clause += ` and ${table}.${key} in ${sqlstring_1.escape(val)}`;
                }
                else {
                    clause += ` and ${table}.${key} = ${sqlstring_1.escape(val)}`;
                }
            });
            resolver.forEach(({ key, value }) => {
                clause += ` ${args[key].resolve(table, value)}`;
            });
            return clause + ';';
        };
    }
}
exports.default = GraphQLQueryType;
//# sourceMappingURL=GraphQLQueryType.js.map