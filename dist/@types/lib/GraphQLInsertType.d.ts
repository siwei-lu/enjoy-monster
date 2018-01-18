import { GraphQLObjectType } from 'graphql';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { ArgumentType } from '../util/args';
export declare type GraphQLInsertTypeConfig = {
    argName: string;
    description?: string;
    type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
};
export default class GraphQLInsertType {
    description: string;
    args: ArgumentType;
    type: any;
    resolve: (value: any, {[this.__argName]: args}: {}, ctx: any, info: any) => Promise<any>;
    private __argName;
    private __schemaName;
    private __sqlDatabase;
    private __sqlTable;
    private __originType;
    private __type;
    constructor(config: GraphQLInsertTypeConfig);
}
