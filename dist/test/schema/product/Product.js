"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const __1 = require("../../..");
const Product = new __1.GraphQLObjectType({
    description: '商品',
    name: 'Product',
    sqlDatabase: 'payment',
    sqlTable: 'sszpay_product',
    uniqueKey: 'sku_id',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt, sqlColumn: 'sku_id', isArg: true },
        title: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: '商品名称'
        }
    })
});
exports.default = Product;
//# sourceMappingURL=Product.js.map