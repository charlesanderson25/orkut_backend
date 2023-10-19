import { faker } from "@faker-js/faker";
import { createUser } from "./user.model.service.mjs";

const defaultLimit = 100;

async function seedUser() {
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} users`);
  for (let index = 0; index < limit; index++) {
    const userData = generateUser();

    const user = await createUser(userData);
    console.log(`Criado usuário de id#${user.id}`);

    // await commentSeed(user);
  }

  console.log("Seed realizado com sucesso!");
}

function generateUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.internet.avatar(),
    pass_word: faker.internet.password(),
  };
}

seedUser();
