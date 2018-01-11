"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Question_1 = require("./Question");
exports.default = {
    createQuestion: new __1.GraphQLInsertType({
        name: '更新 Question',
        argName: 'question',
        description: 'test',
        type: Question_1.default
    }),
};
//# sourceMappingURL=mutation.js.map