import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import GraphQLDateTime from '../../../extra/GraphQLDateTime';
import { hasMany } from '../../..';
import Question from '../question/Question';

const User = new GraphQLObjectType({
  description: '用户',
  name: 'User',
  sqlTable: 'user',
  uniqueKey: 'id',

  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    name: { type: new GraphQLNonNull(GraphQLString) },

    // questions: hasMany(Question, {
    //   thisKey: 'id',
    //   foreignKey: 'create_user',
    //   description: '题目'
    // }),

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

export default User;