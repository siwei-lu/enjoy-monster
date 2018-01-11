import { GraphQLOutputType, GraphQLInt, GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";

import argsUtil, { ArgumentType } from '../util/args';
import typeUtil from '../util/type';

export type GraphQLUpdateTypeConfig = {
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>,
  args?: (args: ArgumentType) => ArgumentType
  description?: string
}

export default class GraphQLUpdateType {
  description: string;
  args: ArgumentType;
  type = GraphQLInt;
  resolve = async (value, { newValue, ...args }, { knex }, info) => {
    return knex(this.__sqlTable)
      .where(argsUtil.sqlArgsOf(args, this.__fields))
      .update(argsUtil.sqlArgsOf(newValue, this.__fields));
  };

  private __type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
  private __originType: GraphQLObjectType & { _typeConfig: any };
  private __sqlTable: string;
  private __fields: any;

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
    this.__fields = this.__originType.getFields();
    
    const args = (config.args || (e => e))(argsUtil.of(config.type));    
    this.args = this.__newValueWith(args);
    this.description = config.description;    
  }
}