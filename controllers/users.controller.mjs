import { findUsers } from "../models/users.model.mjs"


export const getAllUsers = async (req, res, next) => {
    const users = await findUsers()
    res.status(200).send({users})
}