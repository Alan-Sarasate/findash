import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes"
import * as z from 'zod'
import type { CategoryBody } from "./types";
import { validation } from "../../shared/middlewares";

export const createCategoryValidation = validation((GetSchema) => ({
  body: GetSchema<CategoryBody>(z.object({
    name: z.string("O nome da categoria é obrigatório.").min(2, "O nome da categoria deve ter ao menos 2 caracteres"),
    type: z.enum(['income', 'expense'], "Categorias devem ser do tipo entrada (income) ou saída (expense).")
}))}))

export const createCategory = (req: Request<{}, {}, CategoryBody>, res: Response) => {
    
    const { name, type} = req.body
    
    pool.query("INSERT INTO categories (name, type) VALUES ($1, $2) RETURNING *", [name, type], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        return res.status(StatusCodes.CREATED).json(response.rows[0])
    })
}