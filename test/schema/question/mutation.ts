import { GraphQLList } from 'graphql';
import { GraphQLInsertType, GraphQLUpdateType } from '../../..';
import Question from './Question';

export default {
  createQuestion: new GraphQLInsertType({
    argName: 'question',
    description: '新建 Question',    
    type: Question
  }),
  updateQuestion: new GraphQLUpdateType({
    description: '更新 Question',
    type: Question
  })
}