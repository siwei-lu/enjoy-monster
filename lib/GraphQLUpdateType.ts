import { GraphQLOutputType, GraphQLInt, GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";

import argsUtil, { ArgumentType } from '../util/args';
import typeUtil from '../util/type';

export type GraphQLUpdateTypeConfig = {
  name: string,
  type: GraphQLObjectType | GraphQLList<GraphQLObjectType>,
  args?: (args: ArgumentType) => ArgumentType
  description?: string
}

export default class GraphQLUpdateType {
  private __name: string;
  private __type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
  private __description: string;
  private __originType: GraphQLObjectType & { _typeConfig: any };
  private __args: ArgumentType;
  private __sqlTable: string;
  private __fields: any;

  private __newValueWith(args: ArgumentType) {
    return {
      ...args,
      newValue: { type: typeUtil.inputTypeOf(this.__type, true) }
    }
  }

  constructor(config: GraphQLUpdateTypeConfig) {
    this.__name = config.name;
    this.__type = config.type;
    this.__description = config.description;

    this.__originType = typeUtil.originalTypeOf(config.type);
    this.__sqlTable = this.__originType._typeConfig.sqlTable;
    this.__fields = this.__originType.getFields();
    
    const args = (config.args || (e => e))(argsUtil.of(config.type));    
    this.__args = this.__newValueWith(args);
  }

  private __resolve = async (value, { newValue, ...args }, { knex }, info) => {
    return knex(this.__sqlTable)
      .where(argsUtil.sqlArgsOf(args, this.__fields))
      .update(argsUtil.sqlArgsOf(newValue, this.__fields));
  }

  toObject() {
    return {
      name: this.__name,
      type: GraphQLInt,
      args: this.__args,
      description: this.__description,
      resolve: this.__resolve
    }
  }
}