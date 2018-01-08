import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLScalarType } from 'graphql';
import { GraphQLQueryType } from '../..';

import question from './question';
import user from './user';

export default {
  query: { ...question.query, ...user.query }
}