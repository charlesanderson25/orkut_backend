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

export async function readUser(id) {
  try {
    const [rows] = await connectionDataBase.promise().query(
      /*SQL*/
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null; // Retorna null se nenhum registro for encontrado com o ID fornecido
    }

    const user = rows[0];
    return user;
  } catch (error) {
    console.error("Erro na consulta:", error);
    throw error; // Propaga o erro para ser tratado em um nível superior, se necessário
  }
}

export async function readAllUsers() {
  try {
    const queryCode = /*SQL*/ `SELECT * FROM users`;
    const [rows] = await connectionDataBase.promise().query(queryCode);

    return rows;
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}
