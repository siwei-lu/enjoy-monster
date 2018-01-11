import { GraphQLOutputType, GraphQLScalarType } from "graphql";
export declare type ArgumentType = {
    [name: string]: {
        type: GraphQLOutputType;
        [field: string]: any;
    };
};
export declare class Args {
    of(type: GraphQLOutputType): any;
    sqlArgsOf(args: ArgumentType, withFields: any): {};
    sortArgs(): {
        __sort: {
            type: GraphQLScalarType;
            resolve: (table: any, params: any) => string;
        };
    };
}
declare const _default: Args;
export default _default;
