export type ContextWithKnex = {
  knex: any | { [name: string]: any }
}

export function knexOf({ knex }: ContextWithKnex, database?: string) {
  return database ? knex[database] : knex;
}