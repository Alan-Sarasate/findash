import type { RequestHandler } from "express"

type TCors =  RequestHandler

export const Cors:TCors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader('Access-Control-Allow-Methods', "POST, PUT, DELETE, GET, PATCH")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    return next()
}