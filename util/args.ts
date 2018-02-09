import { GraphQLOutputType, GraphQLList, GraphQLNonNull, GraphQLFieldMap, GraphQLString, GraphQLScalarType } from "graphql";
import GraphQLObjectType from '../lib/GraphQLObjectType';

export type ArgumentType = {
  [name: string]: {
    type: GraphQLOutputType,
    [field: string]: any
  }
};

export class Args {
  get sortArg() {
    return {
      _sort: {
        type: GraphQLString,
        resolve: (table, params) => `ORDER BY ${table}.${params}`
      }
    }
  }

  of(type: GraphQLOutputType) {
    if (type instanceof GraphQLList) {
      return {
        ...this.of(type.ofType),
        ...this.sortArg
      }
    }

    if (type instanceof GraphQLObjectType) {
      return type.args;
    }

    return {};
  }

  sqlArgsOf(args: ArgumentType, withFields: any) {
    return Object.entries(args)
      .reduce((sqlArgs, [name, value]) => ({
        ...sqlArgs, [withFields[name].sqlColumn || name]: value
      }), {});
  }
}

export default new Args;