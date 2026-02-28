import { Router } from "express";
import { transactionsController } from "../controllers/transactions";

const transactionsRoutes = Router()

transactionsRoutes.get('/transactions', transactionsController.getAllTransactionsValidation, transactionsController.getAllTransactions)

transactionsRoutes.get('/transactions/:id', transactionsController.getTransactionByIdValidation, transactionsController.getTransactionById)

transactionsRoutes.post('/transactions', transactionsController.createTransactionValidation, transactionsController.createTransaction)

transactionsRoutes.put('/transactions/:id', transactionsController.updateTransactioValidation, transactionsController.updateTransaction)

transactionsRoutes.delete('/transaction/:id', transactionsController.deleteTransactionValidation, transactionsController.deleteTransaction)

export default transactionsRoutes