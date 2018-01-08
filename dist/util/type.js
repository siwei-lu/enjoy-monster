"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function originType(ofType) {
    let isNonNull = false;
    let isArray = false;
    let type = ofType;
    if (type instanceof graphql_1.GraphQLNonNull) {
        isNonNull = true;
        type = originType(type.ofType);
    }
    if (type instanceof graphql_1.GraphQLList) {
        isArray = true;
        type = originType(type.ofType);
    }
    return { isNonNull, isArray, type };
}
exports.originType = originType;
//# sourceMappingURL=type.js.map