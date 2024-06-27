import { getAllUsers, getAUser, postUser } from '../controllers/users.controller.mjs'

import express from 'express'
const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', postUser)
usersRouter.get('/:id', getAUser)

export default usersRouter