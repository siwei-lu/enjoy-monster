"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Question_1 = require("./Question");
const graphql_1 = require("graphql");
const __1 = require("../../..");
exports.default = new __1.GraphQLQueryType({
    question: { type: Question_1.default },
    questions: { type: new graphql_1.GraphQLList(Question_1.default) }
});
