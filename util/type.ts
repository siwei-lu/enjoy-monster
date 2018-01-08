import { GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLOutputType } from 'graphql';

export function originType(ofType: GraphQLOutputType) {
  let isNonNull = false;
  let isArray = false;
  let type: any = ofType;

  if (type instanceof GraphQLNonNull) {
    isNonNull = true;
    type = originType(type.ofType);
  }

  if (type instanceof GraphQLList) {
    isArray = true;
    type = originType(type.ofType);
  }

  return { isNonNull, isArray, type };
}