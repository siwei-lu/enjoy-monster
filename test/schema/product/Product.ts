import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLObjectType } from '../../..';

const Product = new GraphQLObjectType({
  description: '商品',
  name: 'Product',
  sqlDatabase: 'payment',
  sqlTable: 'payment',
  uniqueKey: 'sku_id',
  fields: () => ({
    id: { type: GraphQLInt, sqlColumn: 'sku_id', isArg: true },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品名称'
    }
  })
});

export default Product;