/// <reference types="knex" />
import { GraphQLObjectType, GraphQLFieldMap } from '..';
import { GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLScalarType } from 'graphql';
import * as Knex from 'knex';
export declare type GraphQLInsertTypeConfig = {
    name: string;
    description?: string;
    type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>;
};
export default class GraphQLInsertType {
    name: string;
    schemaName: string;
    description: string;
    sqlTable: string;
    fields: any;
    fieldNames: any;
    type: any;
    constructor(config: GraphQLInsertTypeConfig);
    resolver(withKnex: Knex): (value: any, args: any) => Promise<any>;
    inputType(ofFields: GraphQLFieldMap<any, any>): GraphQLInputObjectType;
    toObject(withKnex: Knex): {
        type: GraphQLScalarType;
        description: string;
        resolve: any;
        args: {
            [x: string]: {
                type: GraphQLInputObjectType;
            };
        };
    };
    private replaceFieldNameToColumn(obj);
}
