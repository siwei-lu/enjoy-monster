"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_1 = require("./question");
const user_1 = require("./user");
exports.default = {
    query: Object.assign({}, question_1.default.query, user_1.default.query),
    mutation: Object.assign({}, question_1.default.mutation)
};
//# sourceMappingURL=index.js.map