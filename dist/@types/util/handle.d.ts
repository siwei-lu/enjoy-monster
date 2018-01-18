import { GraphQLOutputType } from 'graphql';
export declare const thunk: (handle: any) => (value: any) => any;
export declare const callHandle: (handle: any) => (value: any, args: any, context: any, info: any) => any;
export default function handle(type: GraphQLOutputType, parent: any, args: any, context: any, info: any): any;
