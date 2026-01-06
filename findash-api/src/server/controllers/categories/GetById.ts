import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";

export const getById = (req:Request, res:Response) => {
    const id = req.params?.id
    pool.query("SELECT * from categories where id=$1", [id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)
        
        const categorie = response.rows[0]

        return res.status(StatusCodes.OK).send(categorie)
    })
}