import Question from './Question';
import { GraphQLList } from 'graphql';

import { GraphQLQueryType } from '../../..'

export default new GraphQLQueryType({
  question: { type: Question },
  questions: { type: new GraphQLList(Question) }
})