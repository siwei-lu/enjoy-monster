import { GraphQLObjectType as ObjectType, GraphQLObjectTypeConfig as ObjectTypeConfig } from 'graphql';
export declare type GraphQLObjectTypeConfig<TSource, TContext> = ObjectTypeConfig<TSource, TContext> & {
    sqlTable?: string;
    uniqueKey?: string;
};
export default class GraphQLObjectType extends ObjectType {
    ofType: GraphQLObjectType;
    constructor(config: GraphQLObjectTypeConfig<any, any>);
    readonly args: {};
}
