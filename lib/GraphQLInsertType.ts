import { GraphQLObjectType, GraphQLFieldMap, GraphQLString, GraphQLOutputType, GraphQLInputType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLInt, GraphQLScalarType } from 'graphql';
import * as Knex from 'knex';

import typeUtil from '../util/type';

export type GraphQLInsertTypeConfig = {
  name: string
  description?: string,
  type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>
}

export default class GraphQLInsertType {
  private __name: string;
  private __schemaName: string;
  private __description: string;
  private __sqlTable: string;
  private __fieldNames: any;
  private __type: any;
  private __handler: {
    [name: string]: {
      sqlColumn?: string,
      handle?: (value: any) => any
    }
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

  constructor(config: GraphQLInsertTypeConfig) {
    const type = config.type instanceof GraphQLObjectType
      ? config.type
      : config.type.ofType;

    const fields = type.getFields();

    this.__name = config.name;
    this.__sqlTable = type._typeConfig.sqlTable;
    this.__schemaName = type.name;
    this.__type = config.type;
    this.__handler = Object.entries(fields).reduce((handler, [name, { sqlColumn, handle }]) => ({
      ...handler, [name]: { sqlColumn, handle }
    }), {});
  }

  resolver() {
    return async (value, { [this.__name]: args }, { knex }) => {
      const parsedArgs = this.__handle(args);
      return await knex(this.__sqlTable).insert(parsedArgs);
    };
  }

  toObject() {
    return {
      type: GraphQLInt,
      description: this.__description,
      resolve: this.resolver().bind(this),
      args: {
        [this.__name]: { type: typeUtil.inputTypeOf(this.__type) }
      }
    };
  }
}