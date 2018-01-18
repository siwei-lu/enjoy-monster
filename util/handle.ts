import { GraphQLOutputType, GraphQLList, GraphQLNonNull, GraphQLScalarType } from 'graphql';

import GraphQLObjectType from '../lib/GraphQLObjectType';
import typeUtil from './type';

const returnSelf = self => self;
export const thunk = handle => value => (handle || returnSelf)(value);

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
        if (field.type instanceof GraphQLScalarType) {
          result[name] = thunk(field.handle)(parent[name]);
        } else {
          result[name] = thunk(field.handle)(handle(field.type, parent[name], args, context, info));
        }
      });
    return result;
  }
  return parent;
}