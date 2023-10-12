import { faker } from "@faker-js/faker";

import {
  createNotepad,
  deleteNotepad,
  listNotepads,
  readNotepad,
  updateNotepad,
} from "./notepad.model.service.mjs";

const defaultLimit = 100;

async function notepadSeed() {
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} notepads`);
  for (let i = 0; i < limit; i++) {
    const notepadData = generateNotepad();

    const notepad = await createNotepad(notepadData);
    console.log(`Notepad criado com id: ${notepad.id}`);
  }

  console.log("Seed realizado com sucesso!");
}

function generateNotepad() {
  return {
    title: faker.lorem.word(4 + Math.round(Math.random() * 5)),
    subtitle: faker.lorem.words(6 + Math.round(Math.random() * 8)),
    content: faker.lorem.paragraph(3 + Math.round(Math.random() * 7)),
    created_at: faker.date.past({ years: 5 }).toJSON,
  };
}

notepadSeed();
