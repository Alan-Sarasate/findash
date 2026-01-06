import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";

export const deleteCategorie = (req:Request, res:Response) => {
    const id = req.params?.id

    pool.query("DELETE FROM categories where id=$1", [id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        res.status(StatusCodes.NO_CONTENT)
    })
}