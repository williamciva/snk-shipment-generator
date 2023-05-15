import { Database } from 'sqlite3';

// Open a SQLite database, stored in the file db.sqlite
export const db = new Database(__dirname + './databases/snk.db');

export default db;