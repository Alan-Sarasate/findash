import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import z from "zod";

interface IParamsProps {
    id: number;
}

export const getByIdValidation = validation((GetSchema) => ({
    params: GetSchema<IParamsProps>(z.object({
        id: z.coerce
            .number("O id da categoria precisa ser numérico.")
            .int("O id da categoria deve ser um número inteiro.")
            .min(1, "O id da categoria deve ser maior que 0.")
    }))
}))

export const getById = async (req:Request, res:Response) => {
    try {
        const id = req.params?.id
        const getByIdQuery = await pool.query("SELECT * from categories where id=$1", [id])

        if(getByIdQuery.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).send({
            error: {
                message: "Categoria não encontrada."
            }
        })
        
        const category = getByIdQuery.rows[0]

        return res.status(StatusCodes.OK).send(category)
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
    
}