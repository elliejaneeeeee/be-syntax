import { connectToDb } from "../server/db/connection.mjs";
import { createNewUserId } from "../utils/createNewUserId.mjs";

const db = await connectToDb();

export const findUsers = async () => {
  const users = await db.collection("users").find({}).toArray();
  return users;
};

export const findUser = async (id) => {
  const user = await db.collection("users").find({ user_id: id }).toArray();
  return user;
};

export const insertUser = async (username, email, password) => {
  const newId = await createNewUserId();

  const newUserObj = {
    user_id: newId,
    username,
    email,
    password,
    join_date: new Date(),
    profile_picture: `https://ui-avatars.com/api/?name=${username}`,
    bio: "",
    languages: [],
    achievements: [],
    settings: { notifications: { email: false, phone: false } },
  };

  const response = await db.collection("users").insertOne(newUserObj);
  return response
};
