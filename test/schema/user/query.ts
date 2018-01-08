import { GraphQLList } from 'graphql';
import { GraphQLQueryType } from '../../..';
import User from './User';

export default {
  user: new GraphQLQueryType(User),
  users: new GraphQLQueryType(new GraphQLList(User), ({ id, ...args }) => args)
}