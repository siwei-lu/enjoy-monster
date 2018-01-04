// import { GraphQLObjectType, GraphQLFieldMap, GraphQLString } from '..';
// import { GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLInt, GraphQLScalarType } from 'graphql';
// import * as Knex from 'knex';

// export type GraphQLInsertTypeConfig = {
//   name: string
//   description?: string,
//   type: GraphQLObjectType | GraphQLList<any> | GraphQLNonNull<any>
// }

// export default class GraphQLInsertType {
//   name: string;
//   schemaName: string;
//   description: string;
//   sqlTable: string;
//   fields: any;
//   fieldNames: any;
//   type: any;

//   constructor(config: GraphQLInsertTypeConfig) {
//     const type = config.type.ofType;
//     const fields = type.getFields();

//     this.name = config.name;
//     this.sqlTable = type._typeConfig.sqlTable;
//     this.schemaName = type.name;
//     this.type = config.type;
//     this.fields = fields;
//     this.fieldNames = Object.keys(this.replaceFieldNameToColumn(fields));
//   }

//   resolver(withKnex: Knex) {
//     return async (value, args) => {
//       const parsedArgs = this.replaceFieldNameToColumn(args.question);
//       const test = await withKnex(this.sqlTable)
//         .insert(parsedArgs, this.fieldNames);
//       return test;
//     };
//   }

//   inputType(ofFields: GraphQLFieldMap<any, any>) {
//     return new GraphQLInputObjectType({
//       name: `${this.schemaName}InputType`,
//       fields: () => this.fields
//     })
//   }

//   toObject(withKnex: Knex) {
//     return {
//       type: GraphQLInt,
//       description: this.description,
//       resolve: this.resolver(withKnex).bind(this),
//       args: {
//         [this.name]: { type: this.inputType(this.fields) }
//       }
//     }
//   }

//   private replaceFieldNameToColumn(obj: any) {
//     const result = {};

//     Object.entries(obj).forEach(([name, value]) =>
//       result[this.fields[name].sqlColumn || name] = value
//     );

//     return result;
//   }
// }