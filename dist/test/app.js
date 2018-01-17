"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const Knex = require("knex");
const graphql_server_koa_1 = require("graphql-server-koa");
const __1 = require("..");
const config = require("./config");
const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;
const question = Knex(config.question);
const payment = Knex(config.payment);
// const knex = { question, payment };
app.use(koaBody());
const schema_1 = require("./schema");
const parsedSchema = __1.default(schema_1.default);
router.post('/graphql', graphql_server_koa_1.graphqlKoa({ schema: parsedSchema, context: { knex: question } }));
router.get('/graphql', graphql_server_koa_1.graphqlKoa({ schema: parsedSchema, context: { knex: question } }));
router.post('/graphiql', graphql_server_koa_1.graphiqlKoa({ endpointURL: '/graphql' }));
router.get('/graphiql', graphql_server_koa_1.graphiqlKoa({ endpointURL: '/graphql' }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
//# sourceMappingURL=app.js.map