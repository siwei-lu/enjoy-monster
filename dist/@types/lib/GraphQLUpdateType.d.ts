import { GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";
import { ArgumentType } from '../util/args';
export declare type GraphQLUpdateTypeConfig = {
    name: string;
    type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
    args?: (args: ArgumentType) => ArgumentType;
    description?: string;
};
export default class GraphQLUpdateType {
    private __name;
    private __type;
    private __originType;
    private __args;
    private __sqlTable;
    private __fields;
    private __injectNewValueToArgs();
    constructor(config: GraphQLUpdateTypeConfig);
    private __resolve;
    toObject(): {
        name: string;
        type: GraphQLScalarType;
        args: ArgumentType;
        resolve: (value: any, {newValue, ...args}: {
            [x: string]: any;
            newValue: any;
        }, {knex}: {
            knex: any;
        }, info: any) => Promise<any>;
    };
}
