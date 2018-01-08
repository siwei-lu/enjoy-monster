"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
function parseDate(value) {
    if (typeof value !== 'string')
        throw new TypeError('Field error: value is not an instance of string');
    const result = new Date(value);
    if (isNaN(result.getTime()))
        throw new TypeError(`Invalid date: ${value}`);
    if (value !== result.toJSON())
        throw new TypeError(`Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ: ${value}`);
    return result;
}
const GraphQLDateTime = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    // Serialize a date to send to the client.
    serialize(value) {
        // 解析0000-00-00 00:00:00失败时，返回空字符串。不能抛出异常，也不能返回null
        if (!(value instanceof Date))
            return '';
        // throw new TypeError('Field error: value is not an instance of Date');
        if (isNaN(value.getTime()))
            return '';
        // throw new TypeError('Field error: value is an invalid Date');
        return value.toJSON();
    },
    // Parse a date received as a query variable.
    parseValue(value) {
        return parseDate(value);
    },
    // Parse a date received as an inline value.
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING) {
            throw new graphql_1.GraphQLError(`Query error: Can only parse strings to dates but got a: ${ast.kind}`, [ast]);
        }
        try {
            return parseDate(ast.value);
        }
        catch (e) {
            throw new graphql_1.GraphQLError(`Query error: ${e.message}`, [ast]);
        }
    },
});
exports.default = GraphQLDateTime;
//# sourceMappingURL=GraphQLDateTime.js.map