export declare type ContextWithKnex = {
    knex: any | {
        [name: string]: any;
    };
};
export declare function knexOf({knex}: ContextWithKnex, database?: string): any;
