import { GraphQLObjectType, GraphQLOutputType, GraphQLInputType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLScalarType } from 'graphql';
export declare type GraphQLInsertTypeConfig = {
    name: string;
    description?: string;
    type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
};
export default class GraphQLInsertType {
    static graphQLinputTypes: GraphQLInputType[];
    private __name;
    private __schemaName;
    private __description;
    private __sqlTable;
    private __fieldNames;
    private __type;
    private __inputType;
    private __handler;
    constructor(config: GraphQLInsertTypeConfig);
    resolver(): (value: any, {[this.__name]: args}: {}, {knex}: {
        knex: any;
    }) => Promise<any>;
    inputType(ofType: GraphQLOutputType): any;
    toObject(): {
        type: GraphQLScalarType;
        description: string;
        resolve: any;
        args: {
            [x: string]: {
                type: any;
            };
        };
    };
    private __handleArgs(args);
}
