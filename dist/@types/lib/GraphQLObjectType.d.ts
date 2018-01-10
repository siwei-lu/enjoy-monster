import { GraphQLObjectType as ObjectType, GraphQLObjectTypeConfig as ObjectTypeConfig } from 'graphql';
export declare type GraphQLObjectTypeConfig = ObjectTypeConfig<any, any> & {
    sqlTable?: string;
    uniqueKey?: string;
    relations?: () => any;
};
export default class GraphQLObjectType extends ObjectType {
    protected _typeConfig: any;
    protected _fields: any;
    private __args;
    private __isRelationComposed;
    constructor(config: GraphQLObjectTypeConfig);
    readonly args: any;
    /** 重载 GraphQLObjectType 的 getFields 方法
     *  将 relations 注入到 fields 中
     *  使用 Proxy 代理 this 的值
     */
    getFields(): any;
}
