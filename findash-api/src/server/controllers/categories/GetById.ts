import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import type { CategoryParams } from "./types";
import { categoryParamsSchema } from "./schemas";

export const getByIdValidation = validation((GetSchema) => ({
    params: GetSchema<CategoryParams>(categoryParamsSchema)
}))

export const getById = async (req:Request<CategoryParams>, res:Response) => {
    try {
        const { id: categoryId } = req.params
        const getByIdQuery = await pool.query("SELECT * from categories where id=$1", [categoryId])

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