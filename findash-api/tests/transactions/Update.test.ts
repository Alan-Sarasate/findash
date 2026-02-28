import { describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("UPDATE transaction", () => {
    it("Atualizando transação existente", async() => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: "income"})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body.id

        const res2 = await request(app).post('/categories').send({name: "Outra categoria", type: 'expense'})
        expect(res2.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId2 = res2.body.id

        const res3 = await request(app).post('/transactions').send({type: 'income', description: "Testando criação", amount: 200, date: '2026-02-28', categoryId: categoryId})
        expect(res3.statusCode).toEqual(StatusCodes.CREATED)
        const transactionId = res3.body.id

        const res4 = await request(app).put(`/transactions/${transactionId}`).send({type: 'expense', description: 'Testando edição', amount: 300, date: '2026-02-28', categoryId: categoryId2})
        console.log("ERROR: ", res4.error)
        console.log("STATUS ", res4.status)
        console.log("BODY ", res4.body)
        expect(res4.statusCode).toEqual(StatusCodes.OK)
        expect(res4.body).toHaveProperty('id')
    })

    it("Tentando atualizar transação inexistente", async() => {
        const res1 = await request(app).put('/transactions/999999').send({type: 'income', description: "Testando criação", amount: 200, date: '2026-02-28', categoryId: 999999})
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty('error.message')
    })

    it("Tentando atualizar transação com categoria inexistente", async() => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: "income"})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body.id

        const res3 = await request(app).post('/transactions').send({type: 'income', description: "Testando criação", amount: 200, date: '2026-02-28', categoryId: categoryId})
        expect(res3.statusCode).toEqual(StatusCodes.CREATED)
        const transactionId = res3.body.id

        const res4 = await request(app).put(`/transactions/${transactionId}`).send({type: 'expense', description: 'Testando edição', amount: 300, date: '2026-02-28', categoryId: 999999})
        expect(res4.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res4.body).toHaveProperty('error.message')

    })
})