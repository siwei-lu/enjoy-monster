"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const question_1 = require("./question");
exports.default = {
    query: __1.GraphQLQueryType.combined(question_1.default.query),
    mutation: question_1.default.mutation
};
