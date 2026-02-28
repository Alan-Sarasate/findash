import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("GETALL transactions", () => {
    it("Buscando todas as transações", async () => {
        const res1 = await request(app).post('/categories').send({name: 'Categoria teste', type: 'income'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        const categoryId = res1.body?.id

        const res2 = await request(app).post('/transactions').send({type: 'income', amount: 200, description: "Testando criação", date: '2026-02-28', categoryId: categoryId})
        expect(res2.statusCode).toEqual(StatusCodes.CREATED)

        const res3 = await request(app).get('/transactions').send()
        expect(res3.status).toEqual(StatusCodes.OK)
        expect(res3.body.data.length).toBeGreaterThan(0)
        
    })
})