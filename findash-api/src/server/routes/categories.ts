import { Router } from 'express'
import { categoryController } from '../controllers'

const categoryRoutes = Router()

categoryRoutes.post('/categories', categoryController.createCategoryValidation, categoryController.createCategory)

categoryRoutes.get('/categories', categoryController.getAllCategoriesValidation ,categoryController.getAllCategories)

categoryRoutes.get('/categories/:id', categoryController.getByIdValidation, categoryController.getById)

categoryRoutes.put('/categories/:id', categoryController.updateCategoryValidation, categoryController.updateCategory)

categoryRoutes.delete('/categories/:id', categoryController.deleteCategoryValidation, categoryController.deleteCategory)

export default categoryRoutes