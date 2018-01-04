import Question from './Question';
import { GraphQLList } from 'graphql';

import { GraphQLQueryType } from '../../..'

export default {
  question: new GraphQLQueryType(Question),
  questions: new GraphQLQueryType(new GraphQLList(Question))
}