import { GraphQLOutputType } from "graphql";
export declare type ArgumentType = {
    [name: string]: {
        type: GraphQLOutputType;
        [field: string]: any;
    };
};
export declare class Args {
    of(type: GraphQLOutputType): any;
    sqlArgsOf(args: ArgumentType, withFields: any): {};
}
declare const _default: Args;
export default _default;
