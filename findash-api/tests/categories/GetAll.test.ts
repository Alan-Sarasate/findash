import { describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../src/server/app";
import { StatusCodes } from "http-status-codes";

describe("GETALL Categories", () => {
    it("Buscando todas as categorias", async () => {

        const res1 = await request(app).post('/categories').send({name: "Categoria teste", type: "expense"})
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)


        const res2 = await request(app).get('/categories').send()

        expect(Number(res2.headers['x-total-count'])).toBeGreaterThan(0)
        expect(res2.statusCode).toEqual(StatusCodes.OK)
        expect(res2.body.length).toBeGreaterThan(0)
    })

})