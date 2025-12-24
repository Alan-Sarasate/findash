import express  from "express";

const router = express.Router()

router.get('/dashboard', (req, res) => {
    console.log("Buscando dados iniciais da chamada.")
    return "texto"
})

export {router}