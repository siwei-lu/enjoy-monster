"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const graphql_1 = require("graphql");
class GraphQLQueryType {
    constructor(query) {
        this.injectWhere(query);
        this.query = query;
    }
    injectWhere(toQuery) {
        Object.keys(toQuery).map(key => {
            const value = toQuery[key];
            const type = value.type instanceof graphql_1.GraphQLList
                ? value.type.ofType
                : value.type;
            const args = type.args;
            const where = this.where(args);
            value.args = args;
            value.where = where;
        });
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
    static combined(...withQueries) {
        return new GraphQLQueryType(withQueries.reduce((combined, { query }) => (Object.assign({}, combined, query)), {}));
    }
}
exports.default = GraphQLQueryType;
