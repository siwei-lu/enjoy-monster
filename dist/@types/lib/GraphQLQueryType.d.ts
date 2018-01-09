import { GraphQLResolveInfo, GraphQLOutputType } from 'graphql';
import { ArgumentType } from '../util/args';
export declare type WhereType = (talbe: string, args: {}, context: any) => string;
export declare type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;
export default class GraphQLQueryType {
    private __type;
    private __where;
    private __args;
    private __resolve;
    constructor(type: GraphQLOutputType, args?: (args: ArgumentType) => ArgumentType);
    where(withArgs: any): (table: any, params: any) => string;
    toObject(): {
        type: GraphQLOutputType;
        args: ArgumentType;
        where: WhereType;
        resolve: ResolveType;
    };
}
