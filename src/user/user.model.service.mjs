import { connectionDataBase } from "../db.mjs";

export async function createUser(data) {
  try {
    const query = /*SQL*/ `INSERT INTO users(first_name, last_name, avatar, pass_word) VALUES(?, ?, ?, ?)`;
    const values = [
      data.first_name,
      data.last_name,
      data.avatar,
      data.pass_word,
    ];

    await connectionDataBase.promise().query(query, values);

    const [lastInsertResult] = await connectionDataBase
      .promise()
      .query("SELECT LAST_INSERT_ID() as lastInsertId");

    const lastInsertId = lastInsertResult[0].lastInsertId;

    const [result] = await connectionDataBase
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [lastInsertId]);

    if (result.length === 1) {
      return result[0];
    } else {
      return "Nenhum registro inserido, por favor verifique!";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}
