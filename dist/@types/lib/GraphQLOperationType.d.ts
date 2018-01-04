import GraphQLQueryType from './GraphQLQueryType';
export declare type GraphQLOperationTypeConfig = {
    queries: GraphQLQueryType[];
    mutations?: any[];
    directives?: any[];
};
export default class GraphQLOperationType {
    constructor(config: GraphQLOperationTypeConfig);
}
