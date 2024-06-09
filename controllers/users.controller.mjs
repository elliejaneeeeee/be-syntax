import { findUsers, findUser } from "../models/users.model.mjs"
import { isValidId } from "../utils/isValidId"


export const getAllUsers = async (req, res, next) => {
    const users = await findUsers()
    res.status(200).send({users})
}

export const getAUser = async (req, res, next) => {
    const {id} = req.params
    if (!isValidId(id)) {
        return res.status(400).send({msg: "400 Error: Bad Request"})
    }

    const user = await findUser(id)

    if (user.length === 0) {
        return res.status(404).send({msg: "404 Error: Resource Not Found"})
    }
    res.status(200).send({user})
}