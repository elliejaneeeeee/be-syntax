import express from 'express'
import apiRouter from './routes/api-router.mjs'
const app = express()

app.use('/api', apiRouter)

app.all('*', (req, res) => {
    res.status(404).send({msg: "404 Error: Not Found"})
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: "500 Error: Internal Server Error"})
})
export default app