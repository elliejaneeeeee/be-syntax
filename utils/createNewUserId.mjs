import { connectToDb } from '../server/db/connection.mjs'

const db = await connectToDb()

export const createNewUserId = async () => {
    const highestUserId = await db.collection("users").findOne({}, { sort: { "user_id": -1 } })
    const {user_id} = highestUserId
    const numeric = parseInt(user_id.slice(1))

    const newId = numeric + 1
    
    return `U00${newId.toString()}`
}