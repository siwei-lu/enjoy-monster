import { GraphQLOutputType, GraphQLInt, GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";

import argsUtil, { ArgumentType } from '../util/args';
import typeUtil from '../util/type';
import handle, { thunk } from '../util/handle';
import { knexOf } from '../util/knex';

export type GraphQLUpdateTypeConfig = {
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>,
  args?: (args: ArgumentType) => ArgumentType
  description?: string
}

export default class GraphQLUpdateType {
  description: string;
  args: ArgumentType;
  type = GraphQLInt;
  resolve = async (value, { newValue, ...args }, ctx, info) => {
    const knex = knexOf(ctx, this.__sqlDatabase);
    const parsed = handle(this.__type, null, newValue, ctx, info)
    const target = argsUtil.sqlArgsOf(parsed, this.__originType.getFields());

    return knex(this.__sqlTable)
      .where(argsUtil.sqlArgsOf(args, this.__originType.getFields()))
      .update(target);
  };

  private __type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
  private __originType: GraphQLObjectType & { _typeConfig: any };
  private __sqlDatabase: string;
  private __sqlTable: string;
  private __handler: {
    [name: string]: {
      sqlColumn?: string,
      handle?: (value: any) => any
    }
  }

  private __newValueWith(args: ArgumentType) {
    return {
      ...args,
      newValue: { type: typeUtil.inputTypeOf(this.__type, true) }
    }
  }

  constructor(config: GraphQLUpdateTypeConfig) {
    this.__type = config.type;
    this.__originType = typeUtil.originalTypeOf(config.type);
    this.__sqlTable = this.__originType._typeConfig.sqlTable;
    this.__sqlDatabase = this.__originType._typeConfig.sqlDatabase;

    const args = thunk(config.args)(argsUtil.of(config.type));
    this.args = this.__newValueWith(args);
    this.description = config.description;
  }
}