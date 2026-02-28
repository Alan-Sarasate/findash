import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("DELETE transaction", () => {
    it("Excluindo transação existente", async() => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: 'income'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body.id

        const res2 = await request(app).post('/transactions').send({type: 'income', description: "Testando criação", amount: 250, date: '2026-02-28', categoryId: categoryId})
        expect(res2.statusCode).toEqual(StatusCodes.CREATED)
        expect(res2.body).toHaveProperty('id')
        const transactionId = res2.body.id

        const res3 = await request(app).delete(`/transactions/${transactionId}`).send()
        expect(res3.statusCode).toEqual(StatusCodes.OK)
        expect(res3.body).toHaveProperty('id')
    })

    it("Testando excluir transação inexisttente", async () => {
        const res1 = await request(app).delete('/transactions/999999').send()
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty('error.message')
    })
})