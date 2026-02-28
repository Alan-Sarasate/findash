import type { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import pool from "../../database";
import type { TransactionParams } from "./types";
import { transactionParamsSchema } from "./schemas";

export const getTransactionByIdValidation = validation((GetSchema) => ({
    params: GetSchema<TransactionParams>(transactionParamsSchema)
}))

export const getTransactionById = async (req: Request<TransactionParams>, res: Response) => {
    try{
        const { id: transactionId } = req.params
        const response = await pool.query("SELECT * FROM transactions WHERE id=$1", [transactionId])

        if(response?.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).send({
            error: {
                message: "Transação não encontrada"
            }
        })

        const transaction = response?.rows[0]
        return res.status(StatusCodes.OK).send(transaction)
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}