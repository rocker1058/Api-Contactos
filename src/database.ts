import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'libreta_api',
    port: 5432
});