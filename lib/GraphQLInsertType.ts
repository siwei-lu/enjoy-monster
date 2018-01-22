import { GraphQLObjectType, GraphQLFieldMap, GraphQLString, GraphQLOutputType, GraphQLInputType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLInt, GraphQLScalarType } from 'graphql';
import * as Knex from 'knex';

import typeUtil from '../util/type';
import argsUtil, { ArgumentType } from '../util/args';
import { knexOf } from '../util/knex';
import handle from '../util/handle';

export type GraphQLInsertTypeConfig = {
  argName: string;
  description?: string;
  type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
}

export default class GraphQLInsertType {
  description: string;
  args: ArgumentType;
  type = GraphQLInt;
  resolve = async (value, { [this.__argName]: args }, ctx, info) => {
    const knex = knexOf(ctx, this.__sqlDatabase);
    const parsed = handle(this.__type, null, args, ctx, info)
    const target = argsUtil.sqlArgsOf(parsed, this.__originType.getFields());
    return await knex(this.__sqlTable).insert(target);
  };

  private __argName: string;
  private __schemaName: string;
  private __sqlDatabase: string;
  private __sqlTable: string;
  private __originType: GraphQLObjectType & { _typeConfig: any };
  private __type: any;

  constructor(config: GraphQLInsertTypeConfig) {
    this.__originType = typeUtil.originalTypeOf(config.type);

    this.__argName = config.argName;
    this.__sqlTable = this.__originType._typeConfig.sqlTable;
    this.__sqlDatabase = this.__originType._typeConfig.sqlDatabase;
    this.__schemaName = this.__originType.name;
    this.__type = config.type;

    this.description = config.description;
    this.args = {
      [this.__argName]: { type: typeUtil.inputTypeOf(this.__type) }
    };
  }
}