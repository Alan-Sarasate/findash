import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import type { CategoryParams, CategoryPayload } from "./types";
import { categoryParamsSchema, categoryPayloadSchema } from "./schemas";

export const updateCategoryValidation = validation((GetSchema) => ({
    body: GetSchema<CategoryPayload>(categoryPayloadSchema),
    params: GetSchema<CategoryParams>(categoryParamsSchema)
}))

export const updateCategory = async (req:Request<CategoryParams, {}, CategoryPayload>, res:Response) => {

    try{
        const { id: categoryId } = req.params 
        const { name, type } = req.body

        const response = await pool.query("UPDATE categories SET name=$1, type=$2 WHERE id=$3 RETURNING *", [name, type, categoryId])

        if(response.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).send({
            error: {
                message: "Categoria não encontrada"
            }
        })

        const updatedCategory = await response.rows[0]
        return res.status(StatusCodes.OK).send(updatedCategory)

    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}