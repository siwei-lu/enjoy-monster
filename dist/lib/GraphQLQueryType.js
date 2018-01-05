"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const join_monster_1 = require("join-monster");
const graphql_1 = require("graphql");
const resolve = (parent, args, context, resolveInfo) => {
    return join_monster_1.default(resolveInfo, context, async (sql) => (await context.knex.raw(sql))[0], { dialect: 'mysql' });
};
class GraphQLQueryType {
    constructor(type, args) {
        const defaultArgs = this.args(type);
        this.__type = type;
        this.__args = args ? args(defaultArgs) : defaultArgs;
        this.__where = this.where(this.__args);
        this.__resolve = resolve;
    }
    args(ofType) {
        const current = ofType instanceof graphql_1.GraphQLList ? ofType.ofType : ofType;
        if (current instanceof graphql_1.GraphQLScalarType)
            return {};
        return Object
            .entries(current.getFields())
            .filter(([_, field]) => field.isArg)
            .reduce((args, [name, field]) => (Object.assign({}, args, { [name]: { type: field.type, sqlColumn: field.sqlColumn } })), {});
    }
    where(withArgs) {
        return (table, params) => {
            const conditions = {};
            Object.keys(withArgs).forEach(key => {
                const val = params[key];
                if (val === null || val === undefined)
                    return true;
                const sqlColumn = withArgs[key].sqlColumn || key;
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
    toObject() {
        return {
            type: this.__type,
            args: this.__args,
            where: this.__where,
            resolve: this.__resolve
        };
    }
}
exports.default = GraphQLQueryType;
