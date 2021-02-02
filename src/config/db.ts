import dotenv from 'dotenv';
import mysql from 'mysql';


//.env 환경변수 로드
dotenv.config();

export class DB {       
    public connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })
}