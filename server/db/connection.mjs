import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const connectionString = process.env.MONGODB_URI || "";

if (!connectionString) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

const client = new MongoClient(connectionString);
let conn;
let db;

const connectToDb = async () => {
  if (!conn) {
    try {
      conn = await client.connect();
      console.log("Connected!");
      db = conn.db("Syntax");
    } catch (e) {
      console.error(e);
    }
  }
  return db;
};

export { client, connectToDb };
