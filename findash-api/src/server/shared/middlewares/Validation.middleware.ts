import type { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import type { ZodError, ZodType } from "zod"

type TFielfd = 'body' | 'query' | 'params' | 'header'
type TGetSchema = <T>(schema: ZodType<T>) => ZodType<T>
type TAllSchemas = Record<TFielfd, ZodType>
type TGetAllSchemas = (GetSchema: TGetSchema) => Partial<TAllSchemas>
type TValidation = (allSchemas: TGetAllSchemas) => RequestHandler

export const validation:TValidation = (getAllSchemas) => (req, res, next) => {

    const schemas = getAllSchemas(schema => schema);

    const errors:Record<string, ZodError> = {}

    Object.entries(schemas).forEach(([key, schema]) => {
        try{
            schema.parse(req[key as TFielfd])
            
        }catch(err){
            const zodError = err as ZodError        
            errors[key] = zodError
        }
    });

    if(Object.entries(errors).length === 0) return next()

    return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Erro de validação",
        error: errors
    })
}