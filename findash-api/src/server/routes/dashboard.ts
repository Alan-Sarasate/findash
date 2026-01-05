import { Router } from "express"

const dashboardRoutes = Router()

dashboardRoutes.get('/dashboard', (req, res) => {
    console.log("Buscando dados iniciais da chamada.")
    return "texto"
})

export default dashboardRoutes



