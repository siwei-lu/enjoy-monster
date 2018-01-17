import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as koaBody from 'koa-bodyparser';
import * as Knex from 'knex';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import enjoyMonster from '..';

import * as config from './config';

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

const question = Knex(config.question);
const payment = Knex(config.payment);
const knex = { question, payment };

app.use(koaBody());

import schema from './schema';
const parsedSchema = enjoyMonster(schema);
 
router.post('/graphql', graphqlKoa({ schema: parsedSchema, context: { knex } }));
router.get('/graphql', graphqlKoa({ schema: parsedSchema, context: { knex } }));

router.post('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

 
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);