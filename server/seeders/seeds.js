import connection from "../config/connection.js";
import Character from "../models/Character.js";
import User from "../models/User.js";
import { characterData } from "./character-data.js";
import { usersData } from "./user-data.js";

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log("----- START SEEDING -----\n")

  // Save all the characters so we can use their character.id when seeding users
  const characters = await seedCharacters();
  
  await seedUsers(characters);

  console.log("----- COMPLETED SEEDING -----");
  process.exit(0);
});

async function seedUsers(characters) {
  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  console.log("----- USERS SEEDING -----\n")
  for (const user of usersData) {
    try {
      // Randomly assign a characterId to a user
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
      // console.log("randomCharacter:", randomCharacter);
      user.characters = [randomCharacter];

      const newUser = await User.create(user);
      // console.log("user:", newUser);
    } catch (error) {
      // console.log("COULDN'T create user:", user)
      console.error(error)
    }
  }

  console.log("----- USERS SEEDED -----\n")
}

async function seedCharacters() {
  let postsCheck = await connection.db.listCollections({ name: 'characters' }).toArray();
  if (postsCheck.length) {
    await connection.dropCollection('characters');
  }

  console.log("----- CHARACTERS SEEDING -----\n");

  // Save all the characters so we can use their character.id when seeding users
  const newCharacters = [];

  for (const character of characterData) {
    try {
      const newCharacter = await Character.create(character);
      // console.log("created character:", newCharacter);
      newCharacters.push(newCharacter._id);
    } catch (error) {
      // console.log("COULDN'T create post:", post)
      console.error(error)
    }
  }

  console.log("----- CHARACTERS SEEDED -----\n");
  return newCharacters;
}