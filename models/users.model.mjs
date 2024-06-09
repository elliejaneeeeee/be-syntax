import { connectToDb } from '../server/db/connection.mjs'

const db = await connectToDb()

export const findUsers = async () => {
    const users = await db.collection("users").find({}).toArray()
    return users
}

export const findUser = async (id) => {
    const user = await db.collection("users").find({ "user_id": id}).toArray()
    return user
}