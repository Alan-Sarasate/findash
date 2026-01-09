import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import type { CategorieBody } from "./types";
import z, { ZodError } from "zod";

const UpdateCategorieBodyValidation:z.ZodType<CategorieBody> = z.object({
    name: z.string("O nome da categoria é obrigatório").min(2, "O nome da categoria deve ter ao menos 2 caracteres"),
    type: z.enum(['income', 'expense'], "O tipo da categoria deve ser entrada (income) ou saída (expense).")
})

export const updateCategorie = (req:Request, res:Response) => {
    const id = req.params?.id
    let validatedData:CategorieBody | undefined = undefined

    try{
        validatedData = UpdateCategorieBodyValidation.parse(req.body);
    }catch(error){
        const zodError = error as z.ZodError
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Erro de validação",
            erros: zodError.flatten().fieldErrors
        })
    }

    const { name, type } = validatedData

    pool.query("UPDATE categories SET (name, type) VALUES ($1, S2) where id=$3", [name, type, id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        const updatedCategorie = response.rows[0]

        res.status(StatusCodes.OK).send(updatedCategorie)
    })
}