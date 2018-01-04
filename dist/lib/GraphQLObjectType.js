"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class GraphQLObjectType extends graphql_1.GraphQLObjectType {
    constructor(config) {
        super(config);
        this.ofType = this;
    }
    get args() {
        const args = {};
        Object.entries(this.getFields()).forEach(([name, field]) => {
            if (field.isArg) {
                args[name] = { type: field.type };
            }
        });
        return args;
    }
}
exports.default = GraphQLObjectType;
