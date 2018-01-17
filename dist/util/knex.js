"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function knexOf({ knex }, database) {
    return database ? knex[database] : knex;
}
exports.knexOf = knexOf;
//# sourceMappingURL=knex.js.map