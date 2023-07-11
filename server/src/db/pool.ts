import mysql from "mysql2";
import * as config from "../utils/config";

export const pool = mysql.createPool({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_ROOT_PASSWORD,
  database: config.MYSQL_DATABASE,
}).promise();


export const closePool = async () => {
  pool.end();
};

