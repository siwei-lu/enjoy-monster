import {
  GraphQLObjectType as ObjectType,
  GraphQLObjectTypeConfig as ObjectTypeConfig,
  GraphQLNonNull
} from 'graphql';

export type GraphQLObjectTypeConfig = ObjectTypeConfig<any, any> & {
  sqlTable?: string;
  uniqueKey?: string;  
  relations?: () => any;
}

export default class GraphQLObjectType extends ObjectType {
  protected _typeConfig;
  protected _fields;
  private __args;
  private __isRelationComposed = false;

  constructor(config: GraphQLObjectTypeConfig) {
    super(config);
  }

  get args() {
    if (!this.__args) {
      this.__args = Object
        .entries<any>(super.getFields())
        .filter(([, field]) => field.isArg)
        .reduce((args, [name, { sqlColumn, type }]) => ({
          ...args,
          [name]: {
            sqlColumn,
            type: type instanceof GraphQLNonNull ? type.ofType : type
          }
        }), {});
    }
    return this.__args;
  }

  /** 重载 GraphQLObjectType 的 getFields 方法
   *  将 relations 注入到 fields 中
   *  使用 Proxy 代理 this 的值
   */
  getFields() {
    const { fields, relations } = this._typeConfig;

    if (this.__isRelationComposed || !relations) {
      return super.getFields();
    }

    const compose = () => ({ ...fields(), ...relations() });

    const self = new Proxy(this, {
      get(target, key) {
        if (key === '_typeConfig') {
          return {
            ...target._typeConfig,
            fields: compose
          }
        }
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      }
    });

    return super.getFields.call(self);
  }
}