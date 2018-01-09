import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import GraphQLDateTime from '../../../extra/GraphQLDateTime';
import Option from './Option';
import { hasOne } from '../../..';
import User from '../user/User';

const Question = new GraphQLObjectType({
  description: '题目',
  name: 'Question',
  sqlTable: 'question',
  uniqueKey: 'id',

  fields: () => ({
    id: { type: GraphQLInt, isArg: true },

    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: '标题', isArg: true
    },
    type: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '类型 1: 选择题, 2: 填空题, 3: 解答题',
      isArg: true
    },
    remark: { type: GraphQLString, description: '知识点' },
    analysis: { type: GraphQLString, description: '解析' },
    answer: { type: GraphQLString, description: '答案' },

    source: { type: GraphQLString, description: '来源' },
    sourceYear: {
      type: GraphQLString,
      description: '来源年份',
      sqlColumn: 'source_year',
    },
    sourceType: {
      type: GraphQLString,
      description: '来源类型',
      sqlColumn: 'source_type',
    },
    status: {
      type: GraphQLInt,
      description: '状态 0: 不可用, 1: 可用',
      isArg: true
    },

    options: {
      type: new GraphQLList(Option),
      description: '选择题选项',
      sqlColumn: 'options',
      resolve: question => question.options && JSON.parse(question.options),
      handle: options => JSON.stringify(options)
    },

    createType: {
      type: new GraphQLNonNull(GraphQLInt),
      sqlColumn: 'create_type',
      description: '创建类型 0: 文档解析, 1: 人工录入',
    },
    createUser: hasOne(User, {
      thisKey: 'create_user',
      foreignKey: 'id',
      description: '创建人' 
    }),

    createTime: {
      type: GraphQLDateTime,
      sqlColumn: 'create_time',
      description: '创建时间',
    },
    updateTime: {
      type: GraphQLDateTime,
      sqlColumn: 'update_time',
      description: '更新时间',
    }
  })
});

export default Question;