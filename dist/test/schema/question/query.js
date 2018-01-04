"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Question_1 = require("./Question");
const graphql_1 = require("graphql");
const __1 = require("../../..");
exports.default = {
    question: new __1.GraphQLQueryType(Question_1.default),
    questions: new __1.GraphQLQueryType(new graphql_1.GraphQLList(Question_1.default))
};
