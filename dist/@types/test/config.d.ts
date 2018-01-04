export declare const database: {
    client: string;
    debug: boolean;
    connection: {
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
    };
    pool: {
        max: number;
        min: number;
        idleTimeoutMillis: number;
    };
};
