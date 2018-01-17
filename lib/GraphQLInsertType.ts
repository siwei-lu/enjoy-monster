import { GraphQLObjectType, GraphQLFieldMap, GraphQLString, GraphQLOutputType, GraphQLInputType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLInt, GraphQLScalarType } from 'graphql';
import * as Knex from 'knex';

import typeUtil from '../util/type';
import { ArgumentType } from '../util/args';
import { knexOf } from '../util/knex';

export type GraphQLInsertTypeConfig = {
  argName: string;
  description?: string;
  type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
}

export default class GraphQLInsertType {
  description: string;
  args: ArgumentType;
  type = GraphQLInt;
  resolve = async (value, { [this.__argName]: args }, ctx) => {
    const knex = knexOf(ctx, this.__sqlDatabase);
    const parsedArgs = this.__handle(args, ctx);
    return await knex(this.__sqlTable).insert(parsedArgs);
  };

  private __argName: string;
  private __schemaName: string;
  private __sqlDatabase: string;
  private __sqlTable: string;
  private __fieldNames: any;
  private __type: any;
  private __handler: {
    [name: string]: {
      sqlColumn?: string,
      handle?: (value: any, ctx: any) => any
    }
  }

  constructor(config: GraphQLInsertTypeConfig) {
    const type = config.type instanceof GraphQLObjectType
      ? config.type
      : config.type.ofType;
    const fields = type.getFields();

    this.__argName = config.argName;
    this.__sqlTable = type._typeConfig.sqlTable;
    this.__sqlDatabase = type._typeConfig.sqlDatabase;
    this.__schemaName = type.name;
    this.__type = config.type;
    this.__handler = Object.entries(fields)
      .reduce((handler, [name, { sqlColumn, handle }]) => ({
        ...handler, [name]: { sqlColumn, handle }
      }), {});

    this.description = config.description;
    this.args = {
      [this.__argName]: { type: typeUtil.inputTypeOf(this.__type) }
    };
  }

  private __handle(args, ctx) {
    const result = {};

    Object.entries(args).forEach(([name, value]) => {
      value = this.__handler[name].handle ? this.__handler[name].handle(value, ctx) : value;
      name = this.__handler[name].sqlColumn || name;
      result[name] = value;
    });

    return result;
  }
}