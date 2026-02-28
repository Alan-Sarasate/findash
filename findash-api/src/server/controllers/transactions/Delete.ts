import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import type { TransactionParams } from "./types";
import { transactionParamsSchema } from "./schemas";
import pool from "../../database";

export const deleteTransactionValidation = validation((GetSchema) => ({
    params: GetSchema<TransactionParams>(transactionParamsSchema)
}))

export const deleteTransaction = async (req:Request<TransactionParams>, res:Response) => {
    try{
        const { id: transactionId } = req.params
        const response = await pool.query("DELETE FROM transactions WHERE id=$1 RETURNING *", [transactionId])
    
        const deletedTransaction = await response.rows[0]

        return res.status(StatusCodes.OK).send(deletedTransaction)

    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}