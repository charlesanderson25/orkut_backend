import { connectionDataBase } from "../db.mjs";

// export async function createUser(data) {
//   try {
//     const query = /*SQL*/ `INSERT INTO users(first_name, last_name, avatar, pass_word) VALUES(?, ?, ?, ?)`;
//     const values = [
//       data.first_name,
//       data.last_name,
//       data.avatar,
//       data.pass_word,
//     ];

//     await connectionDataBase.promise().query(query, values);

//     const [lastInsertResult] = await connectionDataBase
//       .promise()
//       .query("SELECT LAST_INSERT_ID() as lastInsertId");

//     const lastInsertId = lastInsertResult[0].lastInsertId;

//     const [result] = await connectionDataBase
//       .promise()
//       .query("SELECT * FROM users WHERE id = ?", [lastInsertId]);

//     if (result.length === 1) {
//       return result[0];
//     } else {
//       return "Nenhum registro inserido, por favor verifique!";
//     }
//   } catch (error) {
//     console.error("Erro na consulta", error);
//     throw error;
//   }
// }

export async function createUser(data) {
  try {
    const query = `
      INSERT INTO users (first_name, last_name, avatar, pass_word)
      VALUES (?, ?, ?, ?);
    `;

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

export async function listAllUsers() {
  try {
    const queryCode = /*SQL*/ `SELECT * FROM users`;
    const [rows] = await connectionDataBase.promise().query(queryCode);

    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function addFriend(userA, userB) {
  try {
    const query = /*SQL*/ `
      INSERT INTO friends (user_a, user_b)
      VALUES (?, ?);
    `;

    const values = [userA, userB];

    await connectionDataBase.promise().query(query, values);

    const [lastInsertResult] = await connectionDataBase
      .promise()
      .query("SELECT * FROM friends WHERE id = LAST_INSERT_ID()");

    if (lastInsertResult.length === 1) {
      return lastInsertResult[0];
    } else {
      return "Erro ao incluir os dados, por favor, verifique a query!";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function listLatestFriends(userId) {
  try {
    const query = /*SQL*/ `
      SELECT u.*
      FROM users u
      WHERE u.id IN (
        SELECT f.user_b
        FROM friends f
        WHERE f.user_a = ?
        UNION
        SELECT f.user_a
        FROM friends f
        WHERE f.user_b = ?
      )
      ORDER BY u.created_at DESC
      LIMIT 9;
    `;

    const [rows] = await connectionDataBase
      .promise()
      .query(query, [userId, userId]);
    return rows;
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}
