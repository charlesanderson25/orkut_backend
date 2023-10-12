import mysql from "mysql2";

export const connectionDataBase = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "lakers25",
  database: "projetos",
});
