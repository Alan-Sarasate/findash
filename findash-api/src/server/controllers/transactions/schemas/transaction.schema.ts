import z from "zod";
import type { TransactionParams, TransactionPayload } from "../types";

export const transactionParamsSchema:z.ZodType<TransactionParams> = z.object({
    id: z.coerce.number("O id da transação precisa ser um número") 
})

export const transactionPayloadSchema:z.ZodType<TransactionPayload> = z.object({
    type: z.enum(['income', 'expense']),
    description: z.string().nullable(),
    amount: z.coerce.number('O valor da transação precisa ser um número'),
    categoryId: z.coerce.string(),
    date: z.coerce.date()
})