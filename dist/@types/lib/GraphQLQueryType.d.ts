import { GraphQLObjectType, GraphQLScalarType, GraphQLList, GraphQLResolveInfo } from 'graphql';
export declare type QueryType = GraphQLScalarType | GraphQLObjectType | GraphQLList<GraphQLObjectType>;
export declare type ArgumentType = {
    [name: string]: QueryType;
};
export declare type WhereType = (talbe: string, args: {}, context: any) => string;
export declare type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;
export default class GraphQLQueryType {
    private __type;
    private __where;
    private __args;
    private __resolve;
    constructor(type: QueryType, args?: (defaultArgs: ArgumentType) => ArgumentType);
    args(ofType: QueryType): {};
    where(withArgs: any): (table: any, params: any) => string;
    toObject(): {
        type: QueryType;
        args: ArgumentType;
        where: WhereType;
        resolve: ResolveType;
    };
}
