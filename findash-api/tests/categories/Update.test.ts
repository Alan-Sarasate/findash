import { describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("UPDATE Categorie", () => {
    it('Atualizando categoria existente', async () => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: 'income'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res2 = await request(app).patch(`/categories/${res1?.body?.id}`).send({name: "Testando edição", type: "expense"})

        expect(res2.statusCode).toEqual(StatusCodes.OK)
    })

    it("Atualizando registro que não existe", async () => {
        const res3 = await request(app).patch('/categories/999999').send({name: "Categoria teste", type: "income"})

        expect(res3.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res3.body).toHaveProperty('error.message')
    })
})