import express from 'express'
import { router } from './routes/dashboard'
import 'dotenv/config'
import { categorieRoutes } from './routes/categories'

const app = express()

app.use(express.json())

app.use('/', router)
app.use('/', categorieRoutes)

const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log("Rodando o seervidor na porta 3000")
})
