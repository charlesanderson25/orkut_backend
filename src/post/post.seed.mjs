import { faker } from "@faker-js/faker";

import {
  createPost,
  createPostComment,
  deletePost,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.service.mjs";

const defaultLimit = 100;
const minCommentCount = 3;
const commentRange = 12;

async function postSeed() {
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let i = 0; i < limit; i++) {
    const postData = generatePost();

    const post = await createPost(postData);

    await commentSeed(post);
  }

  console.log("Seed realizado com sucesso!");
}

async function commentSeed(post) {
  const commentCount =
    minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const comment = generateComment();
    const addedComment = await createPostComment(post.id, comment);
    console.log(`Post criado com id: ${addedComment.id}`);
  }
}

function generatePost() {
  return {
    // title: faker.lorem.word(4 + Math.round(Math.random() * 5)),
    content: faker.lorem.words(5 + Math.round(Math.random() * 6)),
    // content: faker.lorem.paragraph(3 + Math.round(Math.random() * 7)),
    // created_at: faker.date.past({ years: 5 }).toJSON,
  };
}

function generateComment() {
  return {
    message: faker.lorem.words(2 + Math.round(Math.random() * 5)),
  };
}

postSeed();
