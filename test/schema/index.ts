import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLScalarType } from 'graphql';
import { GraphQLQueryType, GraphQLObjectType, GraphQLInsertType } from '../..';

import question from './question';

export default {
  query: GraphQLQueryType.combined(question.query),
  mutation: question.mutation
}