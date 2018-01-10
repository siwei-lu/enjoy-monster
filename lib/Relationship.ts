import { GraphQLList } from 'graphql';
import argsUtil from '../util/args';
import GraphQLObjectType from './GraphQLObjectType';

export type RelationConfig = {
  thisKey: string,
  foreignKey: string,
  description?: string
}

export const hasOne = (type: GraphQLObjectType, config: RelationConfig) => ({
  type,  
  description: config.description || '',
  sqlJoin: (fromTable: string, toTable: string) =>
    `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
})

export const hasMany = (type: GraphQLObjectType, config: RelationConfig) => ({
  type: new GraphQLList(type),  
  description: config.description || '',
  args: argsUtil.of(type),
  sqlJoin: (fromTable: string, toTable: string) =>
    `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
})