import { type Request, type Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";

export const getAllCategories = (req:Request, res:Response) => {
    pool.query("SELECT * FROM categories", (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        const categories = response.rows

        return res.status(StatusCodes.OK).send(categories)
    })
}