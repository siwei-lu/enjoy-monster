"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Option = new graphql_1.GraphQLObjectType({
    description: '选项',
    name: 'Option',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString, description: '选项内容' }
    })
});
exports.default = Option;
//# sourceMappingURL=Option.js.map