import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes"
import * as z from 'zod'
import type { CategorieBody } from "./types";

const createCategorieBodyValidation:z.ZodType<CategorieBody> = z.object({
    name: z.string("O nome da categoria é obrigatório.").min(2, "O nome da categoria deve ter ao menos 2 caracteres"),
    type: z.enum(['income', 'expense'], "Categorias devem ser do tipo entrada (income) ou saída (expense)."),})


export const createCategorie = (req: Request<{}, {}, CategorieBody>, res: Response) => {
    let validatedData: CategorieBody | undefined = undefined
    
    try{
        validatedData = createCategorieBodyValidation.parse(req.body)
    }catch(error){
        const zodError = error as z.ZodError
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Erro de validação.",
            erros: zodError.flatten().fieldErrors
        })
    }

    const { name, type} = validatedData
    
    pool.query("INSERT INTO categories (name, type) VALUES ($1, $2)", [name, type], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        console.log("Categoria adicionada com sucesso");
        return res.status(StatusCodes.CREATED).send(response.rows[0])
    })
}