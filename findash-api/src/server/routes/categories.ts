import { Router } from 'express'
import { categorieController } from '../controllers'

const categorieRoutes = Router()

categorieRoutes.post('/categories', categorieController.createCategorie)

categorieRoutes.get('/categories', categorieController.getAllCategories)

categorieRoutes.get('/categories/:id', categorieController.getById)

categorieRoutes.patch('/categories/:id', categorieController.updateCategorie)

categorieRoutes.delete('/categories/:id', categorieController.deleteCategorie)

export default categorieRoutes