import fs from "fs";

const conteudo = "Texto do arquivo teste!";

try {
  fs.writeFileSync("teste.txt", conteudo);
  console.log("Arquivo criado com sucesso!");
} catch (error) {
  console.error("Erro ao criar arquivo", error);
}
