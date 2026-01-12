import { type Request, type Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import z from "zod";

interface IQueryProps {
    page?: number | undefined,
    limit?: number | undefined,
    search?: string | undefined
}

export const getAllCategoriesValidation = validation((GetSchema) => ({
    query: GetSchema<IQueryProps>(z.object({
        page: z.coerce
            .number("A página precisa ser um valor numérico")
            .int("A página precisa ser um valor inteiro")
            .min(1, "A página precisa ser maior que 0.")
            .optional(),
        limit: z.coerce
            .number("O limite precisa ser um valor numérico")
            .int("O limite precisa ser um valor inteiro")
            .min(1, "O limite precisa ser maior que 0.")
            .optional(),
        search: z.string().optional()
    }))
}))

export const getAllCategories = (req:Request<{}, {}, {}, IQueryProps>, res:Response) => {

    pool.query("SELECT * FROM categories", (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        const categories = response.rows

        return res.status(StatusCodes.OK).send(categories)
    })
}