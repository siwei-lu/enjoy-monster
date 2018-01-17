import { GraphQLOutputType, GraphQLInt, GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";

import argsUtil, { ArgumentType } from '../util/args';
import typeUtil from '../util/type';
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
    const parsed = this.__handle(newValue);
    const knex = knexOf(ctx, this.__sqlDatabase);

    return knex(this.__sqlTable)
      .where(argsUtil.sqlArgsOf(args, this.__fields))
      .update(parsed);
  };

  private __type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
  private __originType: GraphQLObjectType & { _typeConfig: any };
  private __sqlDatabase: string;
  private __sqlTable: string;
  private __fields: any;
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
    this.__fields = this.__originType.getFields();
    this.__handler = Object.entries(this.__fields)
      .reduce((handler, [name, { sqlColumn, handle }]) => ({
        ...handler, [name]: { sqlColumn, handle }
      }), {});
    
    const args = (config.args || (e => e))(argsUtil.of(config.type));    
    this.args = this.__newValueWith(args);
    this.description = config.description;    
  }

  private __handle(args) {
    const result = {};

    Object.entries(args).forEach(([name, value]) => {
      value = this.__handler[name].handle ? this.__handler[name].handle(value) : value;
      name = this.__handler[name].sqlColumn || name;
      result[name] = value;
    });

    return result;
  }
}