"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Question_1 = require("./Question");
exports.default = {
    createQuestion: new __1.GraphQLInsertType({
        argName: 'question',
        description: '更新 Question',
        type: Question_1.default
    }),
    updateQuestion: new __1.GraphQLUpdateType({
        description: '更新question',
        type: Question_1.default
    })
};
//# sourceMappingURL=mutation.js.map