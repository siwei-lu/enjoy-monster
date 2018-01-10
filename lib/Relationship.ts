import { GraphQLList } from 'graphql';
import argsUtil from '../util/args';
import GraphQLObjectType from './GraphQLObjectType';

export type RelationConfig = {
  thisKey: string,
  foreignKey: string,
  description?: string
}

const relation = (withType: GraphQLObjectType | GraphQLList<GraphQLObjectType>, config: RelationConfig) => ({
  type: withType,  
  description: config.description || '',
  args: argsUtil.of(withType),
  sqlJoin: (fromTable: string, toTable: string) =>
    `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});

export const hasOne = (type: GraphQLObjectType, config: RelationConfig) =>
  relation(type, config);

export const hasMany = (type: GraphQLObjectType, config: RelationConfig) =>
  relation(new GraphQLList(type), config);