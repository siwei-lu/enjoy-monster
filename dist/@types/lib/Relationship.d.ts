import { GraphQLList } from 'graphql';
import GraphQLObjectType from './GraphQLObjectType';
export declare type RelationConfig = {
    thisKey: string;
    foreignKey: string;
    description?: string;
};
export declare const hasOne: (type: GraphQLObjectType, config: RelationConfig) => {
    type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
    description: string;
    args: any;
    sqlJoin: (fromTable: string, toTable: string) => string;
};
export declare const hasMany: (type: GraphQLObjectType, config: RelationConfig) => {
    type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
    description: string;
    args: any;
    sqlJoin: (fromTable: string, toTable: string) => string;
};
