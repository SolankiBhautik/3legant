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


app.listen(3000, () => console.log("Server ready on port 3000."));

export default app 