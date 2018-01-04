"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const GraphQLDateTime_1 = require("../../../extra/GraphQLDateTime");
const Question = new graphql_1.GraphQLObjectType({
    description: '题目',
    name: 'Question',
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
        // options: {
        //   type: new GraphQLList(Option),
        //   description: '选择题选项',
        //   sqlColumn: 'options',
        //   resolve: question => question.options && JSON.parse(question.options),
        // },
        createType: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            sqlColumn: 'create_type',
            description: '创建类型 0: 文档解析, 1: 人工录入',
        },
        createUser: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            sqlColumn: 'create_user',
            description: '创建用户 ID',
            isArg: true
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
    })
});
exports.default = Question;
