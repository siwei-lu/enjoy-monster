import { GraphQLObjectType, GraphQLList } from 'graphql';

export type RelationConfig = {
  thisKey: string,
  foreignKey: string,
  description?: string
}

const relation = (withType: any, config: RelationConfig) => ({
  type: withType,  
  description: config.description || '',
  sqlJoin: (fromTable: string, toTable: string) =>
    `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`
});

export const hasOne = (type: GraphQLObjectType, config: RelationConfig) =>
  relation(type, config);

export const hasMany = (type: GraphQLObjectType, config: RelationConfig) =>
  relation(new GraphQLList(type), config);