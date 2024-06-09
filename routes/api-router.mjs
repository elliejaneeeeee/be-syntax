import express from 'express'
import usersRouter from './users-router.mjs'

const apiRouter = express.Router()

apiRouter.use('/users', usersRouter)

export default apiRouter

