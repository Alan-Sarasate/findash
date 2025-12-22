import express  from "express";

const router = express.Router()

router.get('/dashboard', (req, res) => {
    console.log("Buscando dados iniciais da chamada.")
    console.log(req.body, "Request")

    return "texto"
})

export {router}