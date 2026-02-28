import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../src/server/app'
import { StatusCodes } from 'http-status-codes'


describe('POST category', () => {
    it('Criando uma categoria', async () => {
        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: "income"})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    })

    it('Categoria com type inválido', async () => {
        const res2 = await request(app).post('/categories').send({name: "Categoria teste", type: "inc"})

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })

    it('Criando sem enviar nenhum dado', async () => {
        const res3 = await request(app).post('/categories').send({})

        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})