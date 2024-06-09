import { connectToDb } from "./connection.mjs";

const seed = async (courses, users, challenges, achievements) => {
  const db = await connectToDb();

  try {
    await db.collection("courses").drop();
    await db.collection("users").drop();
    await db.collection("challenges").drop();
    await db.collection("achievements").drop();
  } catch (e) {
    console.error(e);
  }

  try {
    await db.createCollection("courses");
    await db.createCollection("users");
    await db.createCollection("challenges");
    await db.createCollection("achievements");
  } catch (e) {
    console.error(e);
  }

  try {
    await db.collection("courses").insertMany(courses);
    await db.collection("users").insertMany(users);
    await db.collection("challenges").insertMany(challenges);
    await db.collection("achievements").insertMany(achievements);
  } catch (e) {
    console.error(e);
  }
};

export default seed;
