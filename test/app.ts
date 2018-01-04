import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import enjoyMonster from '..';

import * as config from './config';

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

app.use(koaBody());

import schema from './schema';
const parsedSchema = enjoyMonster(config.database, schema);
 
router.post('/graphql', graphqlKoa({ schema: parsedSchema }));
router.get('/graphql', graphqlKoa({ schema: parsedSchema }));

router.post('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

 
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);