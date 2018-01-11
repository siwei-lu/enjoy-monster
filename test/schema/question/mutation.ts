import { GraphQLList } from 'graphql';
import { GraphQLInsertType, GraphQLUpdateType } from '../../..';
import Question from './Question';

export default {
  createQuestion: new GraphQLInsertType({
    name: '更新 Question',
    argName: 'question',
    description: 'test',
    type: Question
  }),
  // updateQuestion: new GraphQLUpdateType({
  //   name: '更新question',
  //   type: Question
  // })
}