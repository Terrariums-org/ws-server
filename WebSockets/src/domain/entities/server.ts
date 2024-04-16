import cors from "cors";
import express from "express";
import { createServer } from "node:http";

const app = express();

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 8080);

export const server = createServer(app);