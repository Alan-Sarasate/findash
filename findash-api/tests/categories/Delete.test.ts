import { it, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe('DELETE Category', () => {
    it('Excluindo categoria que existe no banco', async () => {
        const res1 = await request(app).post('/categories').send({name: 'Categoria teste', type: 'income'})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        
        const res2 = await request(app).delete(`/categories/${res1?.body?.id}`).send()

        expect(res2.statusCode).toEqual(StatusCodes.OK)
    })

    it('Excluindo registro inexistente', async () => {
        const res3 = await request(app).delete('/categories/99999').send()

        expect(res3.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res3.body).toHaveProperty('error.message')
    })
})