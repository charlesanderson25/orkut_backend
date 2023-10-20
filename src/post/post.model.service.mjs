import fs from "fs";
import * as jsonService from "../json/json.service.mjs";
import cors from "cors";
import express from "express";
import { connectionDataBase } from "../db.mjs";
import { error } from "console";
import { isAsyncFunction } from "util/types";

//Teste conexão banco de dados **********************************************

connectionDataBase.connect((err) => {
  if (err) {
    console.error("Erro na conexão com o Banco de Dados", err);
  } else {
    console.log("Banco de Dados conectado com sucesso");
  }
});

const postsConnection = connectionDataBase.query(
  "Select * from posts",
  (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados", err);
    } else {
      console.log("Registros Encontrados:");
      console.log(results);
    }
    // connectionDataBase.end();
  }
);

// Fim do teste conexão banco de dados **********************************************

const app = express();
app.use(cors());

const postsPath = "data/posts";
const postLatestIdPath = "data/postLatestId.json";

export async function listPosts(orderBy, search) {
  const whereSearch = search ? /*SQL*/ `WHERE content LIKE '%${search}'` : "";
  try {
    const validOrderBy = orderBy === "asc" ? "ASC" : "DESC";
    const [posts] = await connectionDataBase.promise().query(/* SQL */ `
    SELECT 
        posts.id,
        posts.content,
        posts.created_at, 
        posts.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name, 
        users.avatar as user_avatar
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    ${whereSearch}
    ORDER BY posts.created_at ${validOrderBy};`);

    return {
      posts,
    };
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function createPost(data) {
  try {
    const query = "INSERT INTO posts (content, user_id) VALUES (?, ?)";
    const values = [data.content, data.user_id]; // Certifique-se de que data.user_id seja passado

    await connectionDataBase.promise().query(query, values);

    const [lastInsertResult] = await connectionDataBase
      .promise()
      .query("SELECT LAST_INSERT_ID() as lastInsertId");

    const lastInsertId = lastInsertResult[0].lastInsertId;

    const [result] = await connectionDataBase
      .promise()
      .query("SELECT * FROM posts WHERE id = ?", [lastInsertId]);

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

export async function readPost(id) {
  try {
    const [rows] = await connectionDataBase.promise().query(
      /*SQL*/
      `SELECT * FROM posts WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null; // Retorna null se nenhum registro for encontrado com o ID fornecido
    }

    const post = rows[0];
    return post;
  } catch (error) {
    console.error("Erro na consulta:", error);
    throw error; // Propaga o erro para ser tratado em um nível superior, se necessário
  }
}

export async function updatePost(id, data) {
  try {
    const query = "UPDATE posts SET content = ? WHERE id = ?;";
    const values = [data.content, id];

    const [result] = await connectionDataBase.promise().query(query, values);

    if (result.affectedRows === 1) {
      return "O post foi atualizado com sucesso!";
    } else {
      return "Erro ao atualizar o post!";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    const query = "DELETE FROM posts WHERE id = ?";
    const values = [id];

    const [result] = await connectionDataBase.promise().query(query, values);
    if (result.affectedRows === 1) {
      return "Registro excluído com sucesso!";
    } else {
      return "Nenhum registro excluído, verifique o ID.";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function listPostComments(id) {
  try {
    const query =
      /*SQL*/
      `Select 
        comments.id,
        comments.message,
        comments.created_at, 
        comments.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name, 
        users.avatar as user_avatar 
      from comments inner join users on comments.user_id = users.id
      where post_id = ? order by comments.created_at desc`;
    const values = [id];

    const [result] = await connectionDataBase.promise().query(query, values);

    if (result.length > 0) {
      return result;
    } else {
      return "Nenhum comentário encontrado para o post com o ID fornecido.";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

// export async function createPostComment(postId, message, userId) {
//   try {
//     const query =
//       "INSERT INTO comments (message, post_id, user_id) VALUES (?, ?, ?)";
//     const values = [message, postId, userId];

//     await connectionDataBase.promise().query(query, values);

//     const [lastInsertResult] = await connectionDataBase
//       .promise()
//       .query("SELECT * FROM comments WHERE id = LAST_INSERT_ID()");

//     if (lastInsertResult.length === 1) {
//       return lastInsertResult[0];
//     } else {
//       return "Erro ao incluir os dados, por favor, verifique a query!";
//     }
//   } catch (error) {
//     console.error("Erro na consulta", error);
//     throw error;
//   }
// }

export async function createPostComment(postId, message, userId) {
  try {
    const query = `
      INSERT INTO comments (message, post_id, user_id) 
      VALUES (?, ?, ?);
    `;
    const values = [message, postId, userId];

    await connectionDataBase.promise().query(query, values);

    const [lastInsertResult] = await connectionDataBase
      .promise()
      .query("SELECT * FROM comments WHERE id = LAST_INSERT_ID()");

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
