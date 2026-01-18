import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import z from "zod";

interface IParamsProps {
    id: number;
}

export const deleteCategorieValidation = validation((GetSchema) => ({
    params: GetSchema<IParamsProps>(z.object({
        id: z.coerce
            .number("O id da categoria precisa ser numérico.")
            .int("O id da categoria precisa ser inteiro")
            .min(1, "O id da categoria precisa ser mair que 0")
    }))
}))

export const deleteCategorie = (req:Request, res:Response) => {
    const id = req.params?.id

    pool.query("DELETE FROM categories where id=$1", [id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        if(response.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).send({
        error: {
            message: "Categoria não encontrada."
        }
        })

        res.status(StatusCodes.NO_CONTENT).send()
    })
}