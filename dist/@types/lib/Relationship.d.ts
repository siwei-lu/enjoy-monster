import GraphQLObjectType from './GraphQLObjectType';
export declare type RelationConfig = {
    thisKey: string;
    foreignKey: string;
    description?: string;
};
export declare const hasOne: (type: GraphQLObjectType, config: RelationConfig) => {
    type: GraphQLObjectType;
    description: string;
    sqlJoin: (fromTable: string, toTable: string) => string;
};
export declare const hasMany: (type: GraphQLObjectType, config: RelationConfig) => {
    type: any;
    description: string;
    args: any;
    orderBy: (args: any) => {
        [x: number]: any;
    };
    sqlJoin: (fromTable: any, toTable: any, { _sort, ...args }: {
        [x: string]: any;
        _sort: any;
    }) => string;
};
