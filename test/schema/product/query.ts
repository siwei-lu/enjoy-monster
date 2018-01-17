import Product from './Product';
import { GraphQLList } from 'graphql';

import { GraphQLQueryType } from '../../..';

export default {
  product: new GraphQLQueryType(Product),
  products: new GraphQLQueryType(new GraphQLList(Product))
}