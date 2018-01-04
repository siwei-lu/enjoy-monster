import { GraphQLObjectType, GraphQLFieldResolver, GraphQLList } from 'graphql';
export declare type GraphQLQueryTypeConfig = {
    [key: string]: {
        type: GraphQLObjectType | GraphQLList<GraphQLObjectType>;
        args?: {
            [name: string]: {
                where?: {
                    table: string;
                    args: {
                        [name: string]: any;
                    };
                    context: any;
                };
                resolve?: GraphQLFieldResolver<any, any>;
            };
        };
    };
};
export default class GraphQLQueryType {
    query: any;
    constructor(query: GraphQLQueryTypeConfig);
    injectWhere(toQuery: GraphQLQueryTypeConfig): void;
    where(withArgs: any): (table: any, params: any) => string;
    static combined(...withQueries: GraphQLQueryType[]): GraphQLQueryType;
}
