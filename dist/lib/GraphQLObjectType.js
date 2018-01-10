"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class GraphQLObjectType extends graphql_1.GraphQLObjectType {
    constructor(config) {
        super(config);
        this.__isRelationComposed = false;
    }
    get args() {
        if (!this.__args) {
            this.__args = Object
                .entries(super.getFields())
                .filter(([, field]) => field.isArg)
                .reduce((args, [name, { sqlColumn, type }]) => (Object.assign({}, args, { [name]: {
                    sqlColumn,
                    type: type instanceof graphql_1.GraphQLNonNull ? type.ofType : type
                } })), {});
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
        const compose = () => (Object.assign({}, fields(), relations()));
        const self = new Proxy(this, {
            get(target, key) {
                if (key === '_typeConfig') {
                    return Object.assign({}, target._typeConfig, { fields: compose });
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
exports.default = GraphQLObjectType;
//# sourceMappingURL=GraphQLObjectType.js.map