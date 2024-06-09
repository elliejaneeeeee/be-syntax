import express from 'express'
import usersRouter from './users-router.mjs'
import endpoints from "../endpoints.json" assert { type: "json" };

const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
    res.status(200).send({endpoints})
})

apiRouter.use('/users', usersRouter)

export default apiRouter

