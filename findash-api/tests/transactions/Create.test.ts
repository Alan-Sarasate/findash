import { describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("CREATE transaction", () => {
    it("Criando transação", async () => {
        const res1 = await request(app).post('/categories').send({name: "Categoria para teste", type: 'expense'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body.id

        const res2 = await request(app).post('/transactions').send({type: 'expense', amount: 200, description: "Testando criação", date: '2026-02-28', categoryId: categoryId})
        expect(res2.statusCode).toEqual(StatusCodes.CREATED)
        expect(res2.body).toHaveProperty('id')
    })

    it("Tentando criar sem enviar nenhum dado", async () => {
        const res1 = await request(app).post('/transactions').send({})
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })

    it("Tentando criar com uma categoria inexistente", async () => {
        const res1 = await request(app).post('/transactions').send({type: 'expense', amount: 200, description: "Testando criação", date: '2026-02-28', categoryId: 999999})
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })

    it("Tentando criar com um type inexistente", async () => {
        const res1 = await request(app).post('/categories').send({name: "Categoria para teste", type: 'expense'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body.id

        const res2 = await request(app).post('/transactions').send({type: 'type', amount: 200, description: "Testando criação", date: '2026-02-28', categoryId: categoryId})
        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})