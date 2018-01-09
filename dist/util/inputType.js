"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class InputType {
    constructor() {
        this.__inputTypes = {};
        this.__updateTypes = {};
    }
    __inputTypeOf(type) {
        if (type instanceof graphql_1.GraphQLNonNull) {
            return new graphql_1.GraphQLNonNull(this.of(type.ofType));
        }
        if (type instanceof graphql_1.GraphQLList) {
            return new graphql_1.GraphQLList(this.of(type.ofType));
        }
        if (type instanceof graphql_1.GraphQLObjectType) {
            const name = `${type.name}InputType`;
            let inputType = this.__inputTypes[name];
            if (!inputType) {
                inputType = new graphql_1.GraphQLInputObjectType({
                    name,
                    fields: () => Object.entries(type.getFields())
                        .reduce((fields, [name, { type }]) => (Object.assign({}, fields, { [name]: { type: this.of(type) } })), {})
                });
                this.__inputTypes[name] = inputType;
            }
            return inputType;
        }
        return type;
    }
    __updateTypeOf(type) {
        if (type instanceof graphql_1.GraphQLNonNull) {
            return this.__updateTypeOf(type.ofType);
        }
        if (type instanceof graphql_1.GraphQLList) {
            return new graphql_1.GraphQLList(this.__updateTypeOf(type.ofType));
        }
        if (type instanceof graphql_1.GraphQLObjectType) {
            const name = `${type.name}UpdateType`;
            let inputType = this.__updateTypes[name];
            if (!inputType) {
                inputType = new graphql_1.GraphQLInputObjectType({
                    name,
                    fields: () => Object.entries(type.getFields())
                        .reduce((fields, [name, { type }]) => (Object.assign({}, fields, { [name]: { type: this.__updateTypeOf(type) } })), {})
                });
                this.__updateTypes[name] = inputType;
            }
            return inputType;
        }
        return type;
    }
    of(type, isUpdateType = false) {
        return isUpdateType ? this.__updateTypeOf(type) : this.__inputTypeOf(type);
    }
}
exports.InputType = InputType;
exports.default = new InputType;
//# sourceMappingURL=inputType.js.map