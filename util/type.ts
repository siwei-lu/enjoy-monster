import { GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLInputType, GraphQLInputObjectType } from 'graphql';

export class Type {
  private __insertTypes: { [name: string] : GraphQLInputType } = {};
  private __updateTypes: { [name: string]: GraphQLInputType } = {};

  originalTypeOf(type: GraphQLOutputType) {
    if (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
      return this.originalTypeOf(type.ofType);
    }

    return type;
  }
  
  structureOf(type: GraphQLOutputType) {
    let isNonNull = false;
    let isArray = false;

    if (type instanceof GraphQLNonNull) {
      isNonNull = true;
      type = this.structureOf(type.ofType);
    }

    if (type instanceof GraphQLList) {
      isArray = true;
      type = this.structureOf(type.ofType);
    }

    return { isNonNull, isArray, type };
  }

  inputTypeOf(type: GraphQLOutputType, isUpdate = false) {
    if (type instanceof GraphQLNonNull) {
      return isUpdate
        ? this.inputTypeOf(type.ofType)
        : new GraphQLNonNull(this.inputTypeOf(type.ofType, isUpdate))
    }

    if (type instanceof GraphQLList) {
      return new GraphQLList(this.inputTypeOf(type.ofType));
    }

    if (type instanceof GraphQLObjectType) {
      const name = `${type.name}${isUpdate ? 'Update' : 'Insert'}Type`;
      const types = isUpdate ? this.__updateTypes : this.__insertTypes;

      let inputType = types[name];
      if (!inputType) {
        inputType = new GraphQLInputObjectType({
          name,
          fields: () => Object.entries(type.getFields())
            .reduce((fields, [name, { type }]) => ({
              ...fields,
              [name]: { type: this.inputTypeOf(type, isUpdate) }
            }), {})
        });
        types[name] = inputType;
      }
      return inputType;
    }

    return type;
  }
}

export default new Type;