"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class Type {
    constructor() {
        this.__insertTypes = {};
        this.__updateTypes = {};
    }
    originalTypeOf(type) {
        if (type instanceof graphql_1.GraphQLList || type instanceof graphql_1.GraphQLNonNull) {
            return this.originalTypeOf(type.ofType);
        }
        return type;
    }
    structureOf(type) {
        let isNonNull = false;
        let isArray = false;
        if (type instanceof graphql_1.GraphQLNonNull) {
            isNonNull = true;
            type = this.structureOf(type.ofType);
        }
        if (type instanceof graphql_1.GraphQLList) {
            isArray = true;
            type = this.structureOf(type.ofType);
        }
        return { isNonNull, isArray, type };
    }
    inputTypeOf(type, isUpdate = false) {
        if (type instanceof graphql_1.GraphQLNonNull) {
            return isUpdate
                ? this.inputTypeOf(type.ofType)
                : new graphql_1.GraphQLNonNull(this.inputTypeOf(type.ofType, isUpdate));
        }
        if (type instanceof graphql_1.GraphQLList) {
            return new graphql_1.GraphQLList(this.inputTypeOf(type.ofType));
        }
        if (type instanceof graphql_1.GraphQLObjectType) {
            const name = `${type.name}${isUpdate ? 'Update' : 'Insert'}Type`;
            const types = isUpdate ? this.__updateTypes : this.__insertTypes;
            let inputType = types[name];
            if (!inputType) {
                inputType = new graphql_1.GraphQLInputObjectType({
                    name,
                    fields: () => Object.entries(type.getFields())
                        .reduce((fields, [name, { type }]) => (Object.assign({}, fields, { [name]: { type: this.inputTypeOf(type, isUpdate) } })), {})
                });
                types[name] = inputType;
            }
            return inputType;
        }
        return type;
    }
}
exports.Type = Type;
exports.default = new Type;
//# sourceMappingURL=type.js.map