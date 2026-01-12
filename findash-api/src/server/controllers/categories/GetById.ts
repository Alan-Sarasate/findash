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

export const getById = (req:Request, res:Response) => {
    const id = req.params?.id
    pool.query("SELECT * from categories where id=$1", [id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)
        
        const categorie = response.rows[0]

        return res.status(StatusCodes.OK).send(categorie)
    })
}