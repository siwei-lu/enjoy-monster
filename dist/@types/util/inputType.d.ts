import { GraphQLOutputType } from "graphql";
export declare class InputType {
    private __inputTypes;
    private __updateTypes;
    private __inputTypeOf(type);
    private __updateTypeOf(type);
    of(type: GraphQLOutputType, isUpdateType?: boolean): any;
}
declare const _default: InputType;
export default _default;
