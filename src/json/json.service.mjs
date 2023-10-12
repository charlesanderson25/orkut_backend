import fs from "fs";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

export async function createJson(path, data) {
  const dataString = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(path, dataString);
}

export async function readJson(path) {
  const dataBuffer = await fs.promises.readFile(path);
  const dataString = dataBuffer.toString();
  const data = JSON.parse(dataString);
  return data;
}

export async function updateJson(path, partialJson) {
  const oldJson = await readJson(path);
  const nextJson = { ...oldJson, ...partialJson };
  await createJson(path, nextJson);
}

export async function deleteJson(path) {
  await fs.promises.unlink(path);
}
