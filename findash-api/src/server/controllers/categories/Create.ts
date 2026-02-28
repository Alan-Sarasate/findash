import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middlewares";
import type { CategoryPayload } from "./types";
import { categoryPayloadSchema } from "./schemas";

export const createCategoryValidation = validation((GetSchema) => ({
  body: GetSchema<CategoryPayload>(categoryPayloadSchema)}))

export const createCategory = async (req: Request<{}, {}, CategoryPayload>, res: Response) => {

    try{
        const { name, type} = req.body
        const response = await pool.query("INSERT INTO categories (name, type) VALUES ($1, $2) RETURNING *", [name, type])

        const newCategory = await response.rows[0]

        return res.status(StatusCodes.CREATED).send(newCategory)
    }catch(error){
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}