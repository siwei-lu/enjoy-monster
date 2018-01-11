import GraphQLQueryType from '../../lib/GraphQLQueryType';
import GraphQLInsertType from '../../lib/GraphQLInsertType';
import GraphQLUpdateType from '../../lib/GraphQLUpdateType';
declare const _default: {
    query: {
        user: GraphQLQueryType;
        users: GraphQLQueryType;
        question: GraphQLQueryType;
        questions: GraphQLQueryType;
    };
    mutation: {
        createQuestion: GraphQLInsertType;
        updateQuestion: GraphQLUpdateType;
    };
};
export default _default;
