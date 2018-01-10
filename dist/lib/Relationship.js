"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const args_1 = require("../util/args");
exports.hasOne = (type, config) => ({
    type,
    description: config.description || '',
    sqlJoin: (fromTable, toTable) => `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});
exports.hasMany = (type, config) => ({
    type: new graphql_1.GraphQLList(type),
    description: config.description || '',
    args: args_1.default.of(type),
    sqlJoin: (fromTable, toTable) => `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});
//# sourceMappingURL=Relationship.js.map