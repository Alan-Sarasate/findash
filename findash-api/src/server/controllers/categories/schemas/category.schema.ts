import z from "zod";
import type { CategoryParams, CategoryPayload } from "../types";

export const categoryPayloadSchema: z.ZodType<CategoryPayload> = z.object({
    name: z.string("O nome da categoria é obrigatório").min(2, "O nome da categoria precisa ter pelo menos 2 caracteres"),
    type: z.enum(['income', 'expense'], "O tipo da categoria precisa ser Entrada (income) ou Saída (expense)")
})

export const categoryParamsSchema:z.ZodType<CategoryParams> =  z.object({
    id: z.coerce
        .number("O id da categoria precisa ser numérico.")
        .int("O id da categoria precisa ser inteiro")
        .min(1, "O id da categoria precisa ser mair que 0")
})