import express from "express"
import 'dotenv/config';
import cors from "cors";
import mainRouter from "./routes/index.js";


const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));
app.use('/', mainRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API');

});

export default app