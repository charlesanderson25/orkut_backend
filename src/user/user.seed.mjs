import { faker } from "@faker-js/faker";

function generateUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.internet.avatar(),
    pass_word: faker.internet.password(),
  };
}
