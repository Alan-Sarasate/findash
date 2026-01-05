import express from 'express'
import { router } from './server/routes'
import 'dotenv/config'
import { server } from './server/server'

server.use(express.json())

server.use('/', router)

const port = process.env.PORT || 3000

server.listen(port || 3000, () => {
    console.log(`Rodando o servidor na porta: ${port}`)
})
