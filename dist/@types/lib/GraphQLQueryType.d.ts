import { GraphQLResolveInfo, GraphQLOutputType } from 'graphql';
import { ArgumentType } from '../util/args';
export declare type WhereType = (talbe: string, args: {}, context: any) => string;
export declare type OrderByType = (args: any) => {
    [name: string]: 'DESC' | 'ASC';
};
export declare type ResolveType = (parent: any, args: ArgumentType, context: any, resolveInfo: GraphQLResolveInfo) => any;
export default class GraphQLQueryType {
    type: GraphQLOutputType;
    where: WhereType;
    args: ArgumentType;
    resolve: ResolveType;
    orderBy: (...props: any[]) => {
        id: string;
    };
    constructor(type: GraphQLOutputType, args?: (args: ArgumentType) => ArgumentType);
    whereWith(args: any): (table: any, params: any) => string;
}
