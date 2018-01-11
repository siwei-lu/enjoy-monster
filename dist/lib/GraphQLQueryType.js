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
        this.__type = type;
        this.__args = args(args_1.default.of(type));
        this.__where = this.whereWith(this.__args);
        this.__resolve = resolve;
        this.__setEnumableGetter();
    }
    whereWith(args) {
        return (table, params) => {
            const conditions = {};
            Object.keys(args).forEach(key => {
                const val = params[key];
                if (val === null || val === undefined)
                    return true;
                const sqlColumn = args[key].sqlColumn || key;
                conditions[sqlColumn] = val;
            });
            let clause = '1=1';
            Object.keys(conditions).forEach(key => {
                const val = conditions[key];
                if (val === null || val === undefined)
                    return true;
                if (val instanceof Array) {
                    clause += ` and ${table}.${key} in ${sqlstring_1.escape(val)}`;
                }
                else {
                    clause += ` and ${table}.${key} = ${sqlstring_1.escape(val)}`;
                }
            });
            clause += ';';
            return clause;
        };
    }
    __setEnumableGetter() {
        const getters = ['type', 'where', 'args', 'resolve']
            .reduce((sum, name) => (Object.assign({}, sum, { [name]: {
                get() { return this[`__${name}`]; },
                enumerable: true
            } })), {});
        Object.defineProperties(this, Object.assign({}, getters));
    }
}
exports.default = GraphQLQueryType;
//# sourceMappingURL=GraphQLQueryType.js.map