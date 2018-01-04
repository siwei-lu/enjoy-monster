"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const __1 = require("../../..");
const Option = new __1.GraphQLObjectType({
    description: '选项',
    name: 'Option',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString, description: '选项内容' }
    })
});
exports.default = Option;
