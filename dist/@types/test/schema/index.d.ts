import GraphQLQueryType from '../../lib/GraphQLQueryType';
import GraphQLInsertType from '../../lib/GraphQLInsertType';
declare const _default: {
    query: {
        user: GraphQLQueryType;
        users: GraphQLQueryType;
        question: GraphQLQueryType;
        questions: GraphQLQueryType;
    };
    mutation: {
        createQuestion: GraphQLInsertType;
    };
};
export default _default;
