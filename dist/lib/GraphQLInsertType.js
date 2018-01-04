"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class GraphQLInsertType {
    constructor(config) {
        const type = config.type.ofType;
        const fields = type.getFields();
        this.name = config.name;
        this.sqlTable = type._typeConfig.sqlTable;
        this.schemaName = type.name;
        this.type = config.type;
        this.fields = fields;
        this.fieldNames = Object.keys(this.replaceFieldNameToColumn(fields));
    }
    resolver(withKnex) {
        return async (value, args) => {
            const parsedArgs = this.replaceFieldNameToColumn(args.question);
            const test = await withKnex(this.sqlTable)
                .insert(parsedArgs, this.fieldNames);
            return test;
        };
    }
    inputType(ofFields) {
        return new graphql_1.GraphQLInputObjectType({
            name: `${this.schemaName}InputType`,
            fields: () => this.fields
        });
    }
    toObject(withKnex) {
        return {
            type: graphql_1.GraphQLInt,
            description: this.description,
            resolve: this.resolver(withKnex).bind(this),
            args: {
                [this.name]: { type: this.inputType(this.fields) }
            }
        };
    }
    replaceFieldNameToColumn(obj) {
        const result = {};
        Object.entries(obj).forEach(([name, value]) => result[this.fields[name].sqlColumn || name] = value);
        return result;
    }
}
exports.default = GraphQLInsertType;
