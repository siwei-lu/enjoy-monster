export declare const question: {
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
export declare const payment: {
    client: string;
    debug: boolean;
    connection: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
};
