import { getAllUsers } from '../controllers/users.controller.mjs'

import express from 'express'
const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)

export default usersRouter