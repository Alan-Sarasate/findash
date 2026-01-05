import { Router } from 'express'
import pool from '../database'

const categorieRoutes = Router()

categorieRoutes.post('/categories', (req, res) => {
    const { name, type } = req.body
    pool.query("INSERT INTO categories (name, type) VALUES ($1, $2)", [name, type], (error, response) => {
        if(error) return res.send(error)

        console.log("Categoria adicionada com sucesso!")
        res.send(201)
    })
})

categorieRoutes.get('/categories', (req, res) => {
    pool.query("SELECT * FROM categories", (error, response) => {
        if(error) return res.send(error)

        const categories = response.rows
        res.send(categories)
    })
})

categorieRoutes.get('/categories/:id', (req, res) => {
    const id = req.params.id
    pool.query("SELECT * FROM categories where id=$1", [id], (error, response) => {
        if(error) return res.send(error)
        
        res.send(response.rows)
    })
})

categorieRoutes.patch('/categories/:id', (req, res) => {
    const id = req.params.id
    const { name, type } = req.body

    pool.query("UPDATE categories SET name=$1, type=$2 where id=$3", [name, type, id], (error, response) => {
        if(error) return res.send(error)
        
        res.send(204)
    })

})

categorieRoutes.delete('/categories/:id', (req, res) => {
    const id = req.params.id
    
    pool.query("DELETE FROM categories where id=$1", [id], (error, response) => {
        console.log(error)
        if(error) return res.send(error)

        res.send(204)
    })
})

export default categorieRoutes