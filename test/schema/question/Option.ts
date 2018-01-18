import { GraphQLString } from 'graphql';
import { GraphQLObjectType } from '../../..';

const Option = new GraphQLObjectType({
  description: '选项',
  name: 'Option',
  fields: () => ({
    id: {
      type: GraphQLString,
      handle: (id, args, ctx) => `ttt: ${id}`
    },
    content: { type: GraphQLString, description: '选项内容' },
  })
});

export default Option;