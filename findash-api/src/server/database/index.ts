import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

pool.query('SELECT NOW()')
    .then((res) => console.log('Deu certo', res.rows[0]))
    .catch(() => console.log('Deu errado'))
    
    
export default pool