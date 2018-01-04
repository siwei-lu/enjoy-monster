/// <reference types="knex" />
import * as Knex from 'knex';
import { GraphQLSchema, GraphQLFieldMap as FieldMap } from 'graphql';
import GraphQLQueryType from './lib/GraphQLQueryType';
import GraphQLObjectType from './lib/GraphQLObjectType';
import GraphQLInsertType from './lib/GraphQLInsertType';
export declare type GraphQLFieldMap<TSource, TContext> = FieldMap<TSource, TContext> & {
    type: {
        ofType: any;
    };
};
export default function (dbConfig: Knex.Config, schema: any, description?: string): GraphQLSchema;
export { GraphQLQueryType, GraphQLObjectType, GraphQLInsertType };
export { GraphQLString } from 'graphql';
