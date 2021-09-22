import mysql from "mysql2/promise";

const config = {
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "3marx3351944O",
  database: process.env.DATABASE || "motragi",
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.query(sql, params);
  connection.end();
  return results;
}

export default query;
