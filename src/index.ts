import express from "express"
import 'dotenv/config';
import cors from "cors";
import mainRouter from "./routes/index.js";
import { de } from "@faker-js/faker";


const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));
app.use('/', mainRouter);

export default app