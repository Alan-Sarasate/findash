import { router } from "./routes";
import { server } from "./server";
import express  from "express";

server.use(express.json())
server.use('/', router)

export { server as app }