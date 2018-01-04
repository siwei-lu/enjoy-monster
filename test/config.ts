export const database = {
  client: 'mysql',
  debug: true,
  connection: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'questions',
  },
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 120000,
  },
};