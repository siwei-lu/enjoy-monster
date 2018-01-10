"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const args_1 = require("../util/args");
const relation = (withType, config) => ({
    type: withType,
    description: config.description || '',
    args: args_1.default.of(withType),
    sqlJoin: (fromTable, toTable) => `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});
exports.hasOne = (type, config) => relation(type, config);
exports.hasMany = (type, config) => relation(new graphql_1.GraphQLList(type), config);
//# sourceMappingURL=Relationship.js.map