import { describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe('GETBYID Category', () => {
    it('Buscando categoria existente', async () => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: "expense"})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res2 = await request(app).get(`/categories/${res1?.body?.id}`).send()

        expect(res2.statusCode).toEqual(StatusCodes.OK)
    })

    it('Buscando categoria que não existe', async () => {
        const res3 = await request(app).get('/categories/99999').send()

        expect(res3.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res3.body).toHaveProperty('error.message')

    })
})