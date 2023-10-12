import express from "express";
import notepadController from "./notepad/notepad.controller.mjs";
import cors from "cors";
import { connectionDataBase } from "./db.mjs";

const port = 8080;
const host = "0.0.0.0";
const app = express();
app.use(express.json()); //Middleware para trabalhar com JSON

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use("/notepads", notepadController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em: http://${host}:${port}`);
});
