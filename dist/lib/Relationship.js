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
exports.hasOne = (type, config) => ({
    type,
    description: config.description || '',
    sqlJoin: (fromTable, toTable) => `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});
exports.hasMany = (type, config) => {
    const listType = new graphql_1.GraphQLList(type);
    return {
        type: listType,
        description: config.description || '',
        args: args_1.default.of(listType),
        orderBy: args => {
            if (!args.__sort)
                return null;
            const [key, value] = args.__sort.split(' ');
            return {
                [key]: value.toUpperCase()
            };
        },
        sqlJoin: (fromTable, toTable, _a) => {
            var { __sort } = _a, args = __rest(_a, ["__sort"]);
            let clause = `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`;
            Object.entries(args).forEach(([key, value]) => {
                value = isNaN(value) ? `'${value}'` : value;
                clause += ` and ${toTable}.${key} = ${value}`;
            });
            return clause;
        }
    };
};
//# sourceMappingURL=Relationship.js.map