"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./Product");
const graphql_1 = require("graphql");
const __1 = require("../../..");
exports.default = {
    product: new __1.GraphQLQueryType(Product_1.default),
    products: new __1.GraphQLQueryType(new graphql_1.GraphQLList(Product_1.default))
};
//# sourceMappingURL=query.js.map