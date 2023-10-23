import { faker } from "@faker-js/faker";

import {
  createPost,
  createPostComment,
  deletePost,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.service.mjs";
import { listAllUsers } from "../user/user.model.service.mjs";

const defaultLimit = 100;
const minCommentCount = 3;
const commentRange = 12;

async function postSeed() {
  const users = await listAllUsers();
  const usersIds = users.map((user) => user.id);
  console.log(usersIds);
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const userId = getRandomUserId(usersIds);
    console.log(userId);
    const postData = generatePost(userId);

    const post = await createPost(postData);
    console.log(`Criado post de id #${post.id}`);

    await commentSeed(post, usersIds);
  }

  console.log("Seed realizado com sucesso!");
}

async function commentSeed(post, usersIds) {
  const commentCount =
    minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const userId = getRandomUserId(usersIds);
    const comment = generateComment(userId);
    const addedComment = await createPostComment(
      post.id,
      comment.message,
      comment.user_id
    );
    console.log(`Post criado com id: ${addedComment.id}`);
  }
}

function generatePost(user_id) {
  return {
    user_id,
    // title: faker.lorem.word(4 + Math.round(Math.random() * 5)),
    content: faker.lorem.words(5 + Math.round(Math.random() * 6)),
    // content: faker.lorem.paragraph(3 + Math.round(Math.random() * 7)),
    // created_at: faker.date.past({ years: 5 }).toJSON,
  };
}

// function generateComment(user_id) {
//   return {
//     user_id,
//     message: faker.lorem.words(2 + Math.round(Math.random() * 5)),
//   };
// }

function generateComment(user_id) {
  const comment = {
    user_id,
    message: faker.lorem.words(2 + Math.round(Math.random() * 5)),
  };

  console.log("Generated comment:", comment.message); // Adicione esta linha para depuração

  return comment;
}

function getRandomUserId(usersId) {
  return usersId[Math.floor(Math.random() * usersId.length)];
}

postSeed();
