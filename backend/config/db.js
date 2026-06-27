import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const db = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: 'todoapp'
})

await db.connect();

export default db;

