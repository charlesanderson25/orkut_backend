import fs from "fs";
import * as jsonService from "../json/json.service.mjs";
import cors from "cors";
import express from "express";
import { connectionDataBase } from "../db.mjs";
import { error } from "console";

//Teste conexão banco de dados **********************************************

connectionDataBase.connect((err) => {
  if (err) {
    console.error("Erro na conexão com o Banco de Dados", err);
  } else {
    console.log("Banco de Dados conectado com sucesso");
  }
});

const notepadsConnection = connectionDataBase.query(
  "Select * from notepads",
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

const notepadsPath = "data/notepads";
const notepadLatestIdPath = "data/notepadLatestId.json";

// export async function listNotepads({ limit, offset }) { - adiciona paginação
// export async function listNotepads() {
//   const notepadFiles = await fs.promises.readdir(notepadsPath);
//   let notepads = [];
//   for (const notepadFile of notepadFiles) {
//     const currentNotepad = await jsonService.readJson(
//       `${notepadsPath}/${notepadFile}`
//     );
//     notepads.push(currentNotepad);
//   }
//   return {
//     // notepads: notepads.slice(offset, offset + limit), - adiciona paginação
//     notepads,
//     count: notepads.length,
//   };
// }

// Deu merda na paginação!
// export async function listNotepads(limit, offset) {
//   try {
//     const [notepads] = await connectionDataBase
//       .promise()
//       .query(
//         /* SQL */ `SELECT * FROM notepads ORDER BY id DESC LIMIT ? OFFSET ?`,
//         [limit, offset]
//       );

//     const [results] = await connectionDataBase
//       .promise()
//       .query(/* SQL */ `SELECT COUNT(id) AS notepad_count FROM notepads`);

//     return {
//       notepads,
//       count: results[0].notepad_count,
//     };
//   } catch (error) {
//     console.error("Erro na consulta", error);
//     throw error;
//   }
// }

export async function listNotepads() {
  try {
    const [notepads] = await connectionDataBase
      .promise()
      .query(/* SQL */ `SELECT * FROM notepads ORDER BY id DESC`);

    return {
      notepads,
    };
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function createNotepad(data) {
  // const { notepadLatestId } = await jsonService.readJson(notepadLatestIdPath);
  // const notepadId = notepadLatestId + 1;
  // const nextNotepad = {
  //   createdAt: new Date().toJSON(),
  //   id: notepadId,
  //   ...data,
  // };
  // const path = `${notepadsPath}/${nextNotepad.id}.json`;
  // await jsonService.createJson(path, nextNotepad);
  // await jsonService.updateJson(notepadLatestIdPath, {
  //   notepadLatestId: notepadId,
  // });
  // const response = connectionDataBase
  //   .query(
  //     /*SQL*/ `
  //     */ INSERT INTO notepads (title, subtitle, content) VALUES (?, ?, ?);`
  //   )
  //   .start(data.title, data.subtitle, data.content);
  // return response;

  try {
    const query =
      "INSERT INTO notepads (title, subtitle, content) VALUES (?, ?, ?)";
    const values = [data.title, data.subtitle, data.content];

    await connectionDataBase.promise().query(query, values);

    const [lastInsertResult] = await connectionDataBase
      .promise()
      .query("SELECT LAST_INSERT_ID() as lastInsertId");

    const lastInsertId = lastInsertResult[0].lastInsertId;

    const [result] = await connectionDataBase
      .promise()
      .query("SELECT * FROM notepads WHERE id = ?", [lastInsertId]);

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

// export async function readNotepad(id) {
//   // const notepad = await jsonService.readJson(`${notepadsPath}/${id}.json`);
//   // return notepad;
//   const notepad = connectionDataBase.query(
//     "Select * from notepads where id=?",
//     [id]
//   );
//   return notepad;
// }

export async function readNotepad(id) {
  try {
    const [rows] = await connectionDataBase.promise().query(
      /*SQL*/
      `SELECT * FROM notepads WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null; // Retorna null se nenhum registro for encontrado com o ID fornecido
    }

    const notepad = rows[0];
    return notepad;
  } catch (error) {
    console.error("Erro na consulta:", error);
    throw error; // Propaga o erro para ser tratado em um nível superior, se necessário
  }
}

export async function updateNotepad(id, data) {
  // const path = `${notepadsPath}/${id}.json`;
  // await jsonService.updateJson(path, data);
  // const notepad = await jsonService.readJson(path);
  // return notepad;
  try {
    const query =
      "UPDATE notepads SET title = ?, subtitle = ?, content = ? WHERE id = ?;";
    const values = [data.title, data.subtitle, data.content, id];

    const [result] = await connectionDataBase.promise().query(query, values);

    if (result.affectedRows === 1) {
      return "O notepad foi atualizado com sucesso!";
    } else {
      return "Erro ao atualizar o notepad!";
    }
  } catch (error) {
    console.error("Erro na consulta", error);
    throw error;
  }
}

export async function deleteNotepad(id) {
  // const path = `${notepadsPath}/${id}.json`;
  // const notepad = await jsonService.readJson(path);
  // await jsonService.deleteJson(path);
  // return notepad; // Quando deleta-se um recurso, normalmente se retorna esse esse recurso deletado

  try {
    const query = "DELETE FROM notepads WHERE id = ?";
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
