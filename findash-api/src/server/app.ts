import { router } from "./routes";
import express  from "express";
import { Cors } from "./shared/middlewares";

const server = express();

server.use(Cors)
server.use(express.json())
server.use('/', router)

export { server as app }