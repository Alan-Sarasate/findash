import { type Request, type Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import z from "zod";
import type { Category } from "../../shared/types/Category";

export interface IQueryProps {
    page?: number | undefined,
    limit?: number | undefined,
    search?: string | undefined
}

export interface IGetAllResponse {
    totalItems: number, 
    totalPages: number, 
    page: number,
    data: Category[]
}

const ITEMS_PER_PAGE = 20

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

export const getAllCategories = async (req:Request<{}, {}, {}, IQueryProps>, res:Response) => {

    const offset = ITEMS_PER_PAGE * ((req?.query?.page || 1) - 1)

    try{
        const categories = pool.query("SELECT * FROM categories ORDER BY created_at DESC LIMIT $1 OFFSET $2", [ITEMS_PER_PAGE, offset])
        const categoriesCount = pool.query("SELECT COUNT(*) FROM categories")

        const [categoriesResponse, countResponse] = await Promise.all([categories, categoriesCount])
        const count = Number(countResponse?.rows[0]?.count ?? 1)

        const response:IGetAllResponse = {
            data: categoriesResponse.rows ?? [],
            page: req?.query?.page ?? 1,
            totalItems: count,
            totalPages: Math.ceil(count/ITEMS_PER_PAGE)
        }

        return res.status(200).send(response)

    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}