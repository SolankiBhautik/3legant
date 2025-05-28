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






const port = process.env["PORT"] || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
