import { Router } from 'express'
import categorieRoutes from './categories'
import dashboardRoutes from './dashboard'

const router = Router()

router.use(categorieRoutes)
router.use(dashboardRoutes)

export {router }