import { GraphQLObjectType } from 'graphql';
export declare type RelationConfig = {
    thisKey: string;
    foreignKey: string;
    description?: string;
};
export declare const hasOne: (type: GraphQLObjectType, config: RelationConfig) => {
    type: any;
    description: string;
    sqlJoin: (fromTable: string, toTable: string) => string;
};
export declare const hasMany: (type: GraphQLObjectType, config: RelationConfig) => {
    type: any;
    description: string;
    sqlJoin: (fromTable: string, toTable: string) => string;
};
