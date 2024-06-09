import { connectToDb } from '../server/db/connection.mjs'

const db = await connectToDb()

export const findUsers = async () => {
    const users = await db.collection("users").find({}).toArray()
    return users
}