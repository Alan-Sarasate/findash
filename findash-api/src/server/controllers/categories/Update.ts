import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import type { CategoryBody } from "./types";
import z from "zod";
import { validation } from "../../shared/middlewares";

export interface IParamsProps {
    id: number;
}

export const updateCategoryValidation = validation((GetSchema) => ({
    body: GetSchema<CategoryBody>(z.object({
        name: z.string("O nome da categoria é obrigatório").min(2, "O nome da categoria deve ter ao menos 2 caracteres"),
        type: z.enum(['income', 'expense'], "O tipo da categoria deve ser entrada (income) ou saída (expense).")
    })),
    params: GetSchema<IParamsProps>(z.object({
        id: z.coerce
            .number("O id da categoria não foi passado e não é possível encontrar.")
            .int("O id precisa ser um número inteiro.")
            .min(1, "O id precisa ser maior que 0.")
    }))
}))

export const updateCategory = (req:Request, res:Response) => {

    const { id } = req.params
    const { name, type } = req.body as CategoryBody

    pool.query("UPDATE categories SET name=$1, type=$2 WHERE id=$3 RETURNING *", [name, type, id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)
        
        if(response.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).json({
            error: {
                message: "Categoria não encontrada."
            }
        })

        const updatedCategorie = response.rows[0]

        res.status(StatusCodes.OK).send(updatedCategorie)
    })
}