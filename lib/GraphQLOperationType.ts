import { GraphQLObjectType, GraphQLFieldResolver } from 'graphql';

import GraphQLQueryType from './GraphQLQueryType';

export type GraphQLOperationTypeConfig = {
  queries: GraphQLQueryType[],
  mutations?: any[],
  directives?: any[]
}

export default class GraphQLOperationType {
  constructor(config: GraphQLOperationTypeConfig) {

  }
}