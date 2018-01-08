import { GraphQLOutputType } from 'graphql';
export declare function originType(ofType: GraphQLOutputType): {
    isNonNull: boolean;
    isArray: boolean;
    type: any;
};
