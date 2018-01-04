import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLScalarType } from 'graphql';
import { GraphQLQueryType } from '../..';

import question from './question';

export default {
  query: { ...question.query }
}