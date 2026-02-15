import 'dotenv/config'
import { app } from './server/app'

const port = process.env.PORT || 3000

app.listen(port || 3000, () => {
    console.log(`Rodando o servidor na porta: ${port}`)
})
