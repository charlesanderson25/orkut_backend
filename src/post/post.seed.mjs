import { faker } from "@faker-js/faker";

import {
  createPost,
  deletePost,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.service.mjs";

const defaultLimit = 100;

async function postSeed() {
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let i = 0; i < limit; i++) {
    const postData = generatePost();

    const post = await createPost(postData);
    console.log(`Post criado com id: ${post.id}`);
  }

  console.log("Seed realizado com sucesso!");
}

function generatePost() {
  return {
    // title: faker.lorem.word(4 + Math.round(Math.random() * 5)),
    content: faker.lorem.words(5 + Math.round(Math.random() * 6)),
    // content: faker.lorem.paragraph(3 + Math.round(Math.random() * 7)),
    // created_at: faker.date.past({ years: 5 }).toJSON,
  };
}

postSeed();
