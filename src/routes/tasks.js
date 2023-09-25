import express from 'express';
import {CreateTask, GetAllTasks, GetMetricsWithTimeline, GetTotalMetrics, UpdateTask} from "../controllers/tasks.js"
import {UpdateSingleTask} from "../models/tasks.js";

export const taskRouter=express.Router()

taskRouter.post("/",CreateTask)
taskRouter.put("/:id",UpdateTask)
taskRouter.get("/",GetAllTasks)
taskRouter.get("/metrics",GetTotalMetrics)
taskRouter.get("/metrics_timeline",GetMetricsWithTimeline)