import { Router } from 'express'
import categorieRoutes from './categories'
import dashboardRoutes from './dashboard'
import transactionsRoutes from './transactions'

const router = Router()

router.use(categorieRoutes)
router.use(dashboardRoutes)
router.use(transactionsRoutes)

export { router }