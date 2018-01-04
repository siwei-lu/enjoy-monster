import { GraphQLString, GraphQLObjectType } from 'graphql';

const Option = new GraphQLObjectType({
  description: '选项',
  name: 'Option',

  fields: () => ({
    id: { type: GraphQLString },
    content: { type: GraphQLString, description: '选项内容' }
  })
});

export default Option;