import { GraphQLOutputType, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLFieldMap } from "graphql";

export type ArgumentType = {
  [name: string]: {
    type: GraphQLOutputType,
    [field: string]: any
  }
};

export class Args {
  of (type: GraphQLOutputType) {
    if (type instanceof GraphQLList) {
      return this.of(type.ofType);
    }

    if (type instanceof GraphQLObjectType) {
      return Object.entries<any>(type.getFields())
        .filter(([, field]) => field.isArg)
        .reduce((args, [name, field]) => ({
          ...args,
          [name]: {
            sqlColumn: field.sqlColumn,
            type: field.type instanceof GraphQLNonNull
              ? field.type.ofType
              : field.type
          }
        }), {});
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