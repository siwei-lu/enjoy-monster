"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_iso_date_1 = require("graphql-iso-date");
const __1 = require("../../..");
const Question_1 = require("../question/Question");
const User = new __1.GraphQLObjectType({
    description: '用户',
    name: 'User',
    sqlDatabase: 'question',
    sqlTable: 'user',
    uniqueKey: 'id',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt, isArg: true },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        createTime: {
            type: graphql_iso_date_1.GraphQLDateTime,
            sqlColumn: 'create_time',
            description: '创建时间',
        },
        updateTime: {
            type: graphql_iso_date_1.GraphQLDateTime,
            sqlColumn: 'update_time',
            description: '更新时间',
        }
    }),
    relations: () => ({
        questions: __1.hasMany(Question_1.default, {
            thisKey: 'id',
            foreignKey: 'create_user',
            description: '题目'
        })
    })
});
exports.default = User;
//# sourceMappingURL=User.js.map