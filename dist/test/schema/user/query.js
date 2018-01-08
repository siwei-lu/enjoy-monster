"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const __1 = require("../../..");
const User_1 = require("./User");
exports.default = {
    user: new __1.GraphQLQueryType(User_1.default),
    users: new __1.GraphQLQueryType(new graphql_1.GraphQLList(User_1.default), (_a) => {
        var { id } = _a, args = __rest(_a, ["id"]);
        return args;
    })
};
//# sourceMappingURL=query.js.map