"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLDateTime_1 = require("../../../extra/GraphQLDateTime");
const User = new graphql_1.GraphQLObjectType({
    description: '用户',
    name: 'User',
    sqlTable: 'user',
    uniqueKey: 'id',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt, isArg: true },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        // questions: hasMany(Question, {
        //   thisKey: 'id',
        //   foreignKey: 'create_user',
        //   description: '题目'
        // }),
        createTime: {
            type: GraphQLDateTime_1.default,
            sqlColumn: 'create_time',
            description: '创建时间',
        },
        updateTime: {
            type: GraphQLDateTime_1.default,
            sqlColumn: 'update_time',
            description: '更新时间',
        }
    })
});
exports.default = User;
//# sourceMappingURL=User.js.map