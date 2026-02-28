import type { Request, Response } from "express";
import pool from "../../database";
import type { PaginationParams, PaginationResponse, Transaction } from "../../shared/types";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import z from "zod";

export interface TransactionsQueryParams extends PaginationParams {
    search?: string | undefined
}

const ITEMS_PER_PAGE = 20

export const getAllTransactionsValidation = validation((GetSchema) => ({
    query: GetSchema<TransactionsQueryParams>(z.object({
        page: z.coerce
        .number("A página precisa receber um valor numérico")
        .int("O parâmetro de página deve receber um valor inteiro")
        .min(1, "A página precisa ser maior que 0")
        .optional(),
        limit: z.coerce
        .number("O parâmetro de limite precisa receber um valor numérico")
        .int("O parâmetro de limite precisa receber um valor inteiro")
        .min(1, "O parâmetro de limite precisa receber um valor maior que 0")
        .optional(),
        search: z.string().optional()
    }))
}))

export const getAllTransactions = async (req:Request<{}, {}, {}, TransactionsQueryParams>, res: Response) => {
    const page = (req?.query?.page || 1)
    const offset = ITEMS_PER_PAGE * page

    try{
        const transactions = pool.query("SELECT * FROM transactions ORDER BY created_at DESC LIMIT $1 OFFSET $2", [ITEMS_PER_PAGE, offset])
        const transactionsCount = pool.query("SELECT COUNT(*) FROM transactions")

        const [transactionsResponse, transactionsCountResponse] = await Promise.all([transactions, transactionsCount])

        const count = Number(transactionsCountResponse?.rows[0]?.count ?? 0)
        const response:PaginationResponse<Transaction> = {
            data: transactionsResponse?.rows || [],
            page: page,
            totalItems: count,
            totalPages: Math.ceil(count/ITEMS_PER_PAGE)
        }

        return res.status(StatusCodes.OK).send(response)

    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}