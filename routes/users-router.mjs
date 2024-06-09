import { getAllUsers, getAUser } from '../controllers/users.controller.mjs'

import express from 'express'
const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getAUser)

export default usersRouter