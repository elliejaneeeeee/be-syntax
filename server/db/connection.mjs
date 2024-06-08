import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const connectionString = process.env.MONGODB_URI || "";

const client = new MongoClient(connectionString);
let conn;

try {
  conn = await client.connect();
  console.log("Connected!");
} catch (e) {
  console.error(e);
}

let db = await conn.db("Syntax");

export default db;
