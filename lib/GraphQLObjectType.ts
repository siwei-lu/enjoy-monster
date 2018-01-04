import {
  GraphQLObjectType as ObjectType,
  GraphQLObjectTypeConfig as ObjectTypeConfig
} from 'graphql';

export type GraphQLObjectTypeConfig<TSource, TContext> =
  ObjectTypeConfig<TSource, TContext> & {
    sqlTable?: string,
    uniqueKey?: string
  };

export default class GraphQLObjectType extends ObjectType {
  ofType: GraphQLObjectType;

  constructor(config: GraphQLObjectTypeConfig<any, any>) {
    super(config);
    this.ofType = this;
  }

  get args() {
    const args = {};

    Object.entries<any>(this.getFields()).forEach(([name, field]) => {
      if (field.isArg) {
        args[name] = { type: field.type };
      }
    });

    return args;
  }
}