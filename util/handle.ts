import { GraphQLOutputType, GraphQLList, GraphQLNonNull, GraphQLScalarType } from 'graphql';

import GraphQLObjectType from '../lib/GraphQLObjectType';
import typeUtil from './type';

const returnSelf = self => self;
export const thunk = handle => value => (handle || returnSelf)(value);
export const callHandle = handle => (value, args, context, info) =>
  handle ? handle(value, args, context, info) : value;

export default function handle(type: GraphQLOutputType, parent, args, context, info) {
  if (!parent) {
    parent = args;
  }
  if (type instanceof GraphQLList) {
    return parent.map(value => handle(type.ofType, value, args, context, info));
  }
  if (type instanceof GraphQLNonNull) {
    return handle(type.ofType, parent, args, context, info);
  }
  if (type instanceof GraphQLObjectType) {
    const result = {};
    Object.entries(type.getFields())
      .filter(([name]) => parent[name])
      .forEach(([name, field]) => {
        const value = field.type instanceof GraphQLScalarType
          ? parent[name]
          : handle(field.type, parent[name], args, context, info);
        result[name] = callHandle(field.handle)(value, args, context, info);
      });
    return result;
  }
  return parent;
}