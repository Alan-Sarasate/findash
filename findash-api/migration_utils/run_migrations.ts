import fs from 'fs'
import path from 'path'
import pool from '../database'

async function runMigrations() {
    const migrationsPath = './migrations'
    const files = fs.readdirSync(migrationsPath).sort()

    for(const file of files){
        if(file.endsWith('.sql')){
            const filePath = path.join(migrationsPath, file)
            const sql = fs.readFileSync(filePath, 'utf-8')
            
            await pool.query(sql)
            console.log(`Migration ${file} executada.`)
        }
    }

    process.exit(0)
}

runMigrations().catch((erro) => {
    console.error("Erro ao executar as migrations. ", erro)
    process.exit(1)
})

