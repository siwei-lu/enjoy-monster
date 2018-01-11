import { GraphQLObjectType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { ArgumentType } from '../util/args';
export declare type GraphQLInsertTypeConfig = {
    argName: string;
    description?: string;
    type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
};
export default class GraphQLInsertType {
    description: string;
    args: ArgumentType;
    type: GraphQLScalarType;
    resolve: (value: any, {[this.__argName]: args}: {}, {knex}: {
        knex: any;
    }) => Promise<any>;
    private __argName;
    private __schemaName;
    private __sqlTable;
    private __fieldNames;
    private __type;
    private __handler;
    constructor(config: GraphQLInsertTypeConfig);
    private __handle(args);
}
