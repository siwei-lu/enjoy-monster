import { GraphQLScalarType, GraphQLObjectType, GraphQLList } from "graphql";
import { ArgumentType } from '../util/args';
export declare type GraphQLUpdateTypeConfig = {
    type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
    args?: (args: ArgumentType) => ArgumentType;
    description?: string;
};
export default class GraphQLUpdateType {
    description: string;
    args: ArgumentType;
    type: GraphQLScalarType;
    resolve: (value: any, {newValue, ...args}: {
        [x: string]: any;
        newValue: any;
    }, {knex}: {
        knex: any;
    }, info: any) => Promise<any>;
    private __type;
    private __originType;
    private __sqlTable;
    private __fields;
    private __handler;
    private __newValueWith(args);
    constructor(config: GraphQLUpdateTypeConfig);
    private __handle(args);
}
