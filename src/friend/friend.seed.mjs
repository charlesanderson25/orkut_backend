import { listAllUsers } from "../user/user.model.service.mjs";

const minFriendsCount = 12;
const friendsRange = 15;

async function seedFriend() {
  //   const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  //   console.log(`Vão ser criados ${limit} users`);
  const users = await listAllUsers();
  const usersId = users.map((user) => user.id);
  let friendships = [];

  for (const id of usersId) {
    const friendsCount =
      minFriendsCount + Math.round(Math.random() * friendsRange);
    // console.log(friendsCount);
    for (let index = 0; index < friendsCount; index++) {
      let randomId;
      do {
        randomId = usersId[Math.floor(Math.random() * usersId.length)];
      } while (
        randomId === id ||
        friendships.some(
          (friend) =>
            (friend.user_a === id && friend.user_b === randomId) ||
            (friend.user_a === randomId && friend.user_b === id)
        )
      );
      friendships.push({
        user_a: id,
        user_b: randomId,
      });
    }
  }
  console.log(friendships);
}

seedFriend();
