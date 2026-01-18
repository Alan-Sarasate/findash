import 'dotenv/config'
import { server } from './server/server'

const port = process.env.PORT || 3000

server.listen(port || 3000, () => {
    console.log(`Rodando o servidor na porta: ${port}`)
})
