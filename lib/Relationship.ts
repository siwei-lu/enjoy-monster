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

export const hasMany = (type: GraphQLObjectType, config: RelationConfig) => {
  const listType = new GraphQLList(type);
  return {
    type: listType,  
    description: config.description || '',
    args: argsUtil.of(listType),
    orderBy: args => {
      if (!args.__sort) return null;

      const [key, value] = args.__sort.split(' ');
      return {
        [key]: value.toUpperCase()
      }
    },
    sqlJoin: (fromTable, toTable, { __sort, ...args }) => {
      let clause = `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`;

      Object.entries(args).forEach(([key, value]) => {
        value = isNaN(value) ? `'${value}'` : value;
        clause += ` and ${toTable}.${key} = ${value}`;
      });
  
      return clause;
    }
  };
}
