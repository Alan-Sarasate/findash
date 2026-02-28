import type { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import pool from "../../database";
import type { TransactionPayload } from "./types";
import { transactionPayloadSchema } from "./schemas";

export const createTransactionValidation = validation((GetSchema) => ({
    body: GetSchema<TransactionPayload>(transactionPayloadSchema)
}))

export const createTransaction = async (req: Request<{}, {}, TransactionPayload>, res: Response) => {
    try{
        const { type, amount, description, date, categoryId } = req.body

        const response = await pool.query("INSERT INTO transactions (type, description, amount, date, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [type, description, amount, date, categoryId])

        const newTransaction = await response.rows[0]

        return res.status(StatusCodes.CREATED).send(newTransaction)

    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}