import type { Request, Response } from "express";
import pool from "../../database";
import { StatusCodes } from "http-status-codes";

export const updateCategorie = (req:Request, res:Response) => {
    const id = req.params?.id
    const { name, type } = req.body
    pool.query("UPDATE categories SET (name, type) VALUES ($1, S2) where id=$3", [name, type, id], (error, response) => {
        if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)

        const updatedCategorie = response.rows[0]

        res.status(StatusCodes.OK).send(updatedCategorie)
    })
}