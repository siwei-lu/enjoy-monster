"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.question = {
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
exports.payment = {
    client: 'mysql',
    debug: true,
    connection: {
        host: '192.168.0.3',
        port: 3307,
        user: 'pay',
        password: 'XhrlaItQIsHvRAIB',
        database: 'payment'
    }
};
//# sourceMappingURL=config.js.map