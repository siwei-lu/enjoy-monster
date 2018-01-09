import { GraphQLObjectType } from 'graphql';
import { GraphQLList, GraphQLNonNull, GraphQLScalarType } from 'graphql';
export declare type GraphQLInsertTypeConfig = {
    name: string;
    description?: string;
    type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
};
export default class GraphQLInsertType {
    private __name;
    private __schemaName;
    private __description;
    private __sqlTable;
    private __fieldNames;
    private __type;
    private __handler;
    private __handle(args);
    constructor(config: GraphQLInsertTypeConfig);
    resolver(): (value: any, {[this.__name]: args}: {}, {knex}: {
        knex: any;
    }) => Promise<any>;
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
}
