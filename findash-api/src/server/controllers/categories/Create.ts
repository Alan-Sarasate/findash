import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes"


export const createCategorie = (req: Request, res: Response) => {
    const { name, type} = req.body
    pool.query("INSERT INTO categories (name, type) VALUES ($1, $2)", [name, type], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        console.log("Categoria adicionada com sucesso");
        return res.status(StatusCodes.CREATED).send(response.rows[0])
    })
}