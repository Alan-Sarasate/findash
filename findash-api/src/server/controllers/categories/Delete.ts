import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import type { CategoryParams } from "./types";
import { categoryParamsSchema } from "./schemas";

export const deleteCategoryValidation = validation((GetSchema) => ({
    params: GetSchema<CategoryParams>(categoryParamsSchema)
}))

export const deleteCategory = async (req:Request<CategoryParams>, res:Response) => {
    try{
        const { id: categoryId } = req.params
        const response = await pool.query("DELETE FROM categories WHERE id=$1 RETURNING *", [categoryId])

        if(response.rowCount === 0) return res.status(StatusCodes.NOT_FOUND).send({
            error: {
                message: "Categoria não encontrada"
            }
        })

        const deletedCategory = response.rows[0]

        return res.status(StatusCodes.OK).send(deletedCategory)
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}