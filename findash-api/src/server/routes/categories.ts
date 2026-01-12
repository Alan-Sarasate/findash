import { Router } from 'express'
import { categorieController } from '../controllers'

const categorieRoutes = Router()

categorieRoutes.post('/categories', categorieController.createCategorieValidation, categorieController.createCategorie)

categorieRoutes.get('/categories', categorieController.getAllCategoriesValidation ,categorieController.getAllCategories)

categorieRoutes.get('/categories/:id', categorieController.getByIdValidation ,categorieController.getById)

categorieRoutes.patch('/categories/:id', categorieController.updateCategorieValidation, categorieController.updateCategorie)

categorieRoutes.delete('/categories/:id', categorieController.deleteCategorieValidation ,categorieController.deleteCategorie)

export default categorieRoutes