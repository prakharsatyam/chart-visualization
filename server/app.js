import express from "express";
import cors from 'cors'
import { router as dataRouter } from "./routes/dataset.route.js";
const app = express();
var corsOpts={
    origin:"http://localhost:5173"
}
app.use(cors(corsOpts))
app.use(express.json());
app.use("/api/v1",dataRouter);

export default app