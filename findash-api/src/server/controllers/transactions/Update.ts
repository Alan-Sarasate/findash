import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import pool from "../../database";
import type { TransactionParams, TransactionPayload } from "./types";
import { transactionParamsSchema, transactionPayloadSchema } from "./schemas";

export const updateTransactioValidation = validation((GetSchema) => ({
    params: GetSchema<TransactionParams>(transactionParamsSchema),
    body: GetSchema<TransactionPayload>(transactionPayloadSchema)
}))

export const updateTransaction = async (req:Request<TransactionParams, {}, TransactionPayload>, res:Response) => {
    try{
        const { id: transactionId } = req.params
        const { type, description, amount, categoryId, date} = req.body

        const response = await pool.query("UPDATE transactions SET type: $1, description=$2, amount=$3, categooryId=$4, date=$5 WHERE id=$6 RETURNING *", [type, description, amount, categoryId, date, transactionId])

        const updatedTransaction = await response.rows[0]

        return res.status(StatusCodes.OK).send(updatedTransaction)
        
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
} 