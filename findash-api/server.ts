import express from 'express'
import { router } from './routes/dashboard'
import 'dotenv/config'
import  db  from './database'

const app = express()

app.use('/', router)

const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log("Rodando o seervidor na porta 3000")
})
