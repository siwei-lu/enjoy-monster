"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLDateTime_1 = require("../../../extra/GraphQLDateTime");
const Option_1 = require("./Option");
const __1 = require("../../..");
const User_1 = require("../user/User");
const Question = new __1.GraphQLObjectType({
    description: '题目',
    name: 'Question',
    sqlDatabase: 'question',
    sqlTable: 'question',
    uniqueKey: 'id',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt, isArg: true },
        title: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: '标题', isArg: true
        },
        type: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            description: '类型 1: 选择题, 2: 填空题, 3: 解答题',
            isArg: true
        },
        remark: { type: graphql_1.GraphQLString, description: '知识点' },
        analysis: { type: graphql_1.GraphQLString, description: '解析' },
        answer: { type: graphql_1.GraphQLString, description: '答案' },
        source: { type: graphql_1.GraphQLString, description: '来源' },
        sourceYear: {
            type: graphql_1.GraphQLString,
            description: '来源年份',
            sqlColumn: 'source_year',
        },
        sourceType: {
            type: graphql_1.GraphQLString,
            description: '来源类型',
            sqlColumn: 'source_type',
        },
        status: {
            type: graphql_1.GraphQLInt,
            description: '状态 0: 不可用, 1: 可用',
            isArg: true
        },
        options: {
            type: new graphql_1.GraphQLList(Option_1.default),
            description: '选择题选项',
            sqlColumn: 'options',
            resolve: question => question.options && JSON.parse(question.options),
            handle: options => JSON.stringify(options)
        },
        createType: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            sqlColumn: 'create_type',
            description: '创建类型 0: 文档解析, 1: 人工录入',
        },
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
    }),
    relations: () => ({
        createUser: __1.hasOne(User_1.default, {
            thisKey: 'create_user',
            foreignKey: 'id',
            description: '创建人'
        })
    })
});
exports.default = Question;
//# sourceMappingURL=Question.js.map