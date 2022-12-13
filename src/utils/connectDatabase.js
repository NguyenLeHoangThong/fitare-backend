import knex from 'knex';
import parse from 'pg-connection-string';

export const getConnection = () => {
    return new knex({
        client: 'pg',
        connection: parse(process.env.PG_CONNECTION_STRING),
        searchPath: ['knex', 'public'],
    });
}


