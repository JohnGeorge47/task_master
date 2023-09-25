import express from 'express';
import bodyParser from "body-parser";
import {taskRouter} from "./routes/tasks.js";

export const app =express()
app.use(bodyParser.json());

app.use("/api/tasks",taskRouter)
