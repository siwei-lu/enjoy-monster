import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLScalarType } from 'graphql';

import GraphQLQueryType from '../../lib/GraphQLQueryType';
import GraphQLInsertType from '../../lib/GraphQLInsertType';
import GraphQLUpdateType from '../../lib/GraphQLUpdateType';

import question from './question';
import user from './user';
import product from './product'

export default {
  query: { ...question.query, ...user.query, ...product.query },
  mutation: { ...question.mutation }
}