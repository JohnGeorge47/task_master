import {
  CreateSingleTask,
  GetAllMetricsFromDb,
  GetAllTasksFromDb,
  GetTimelineMetricsFromDb,
  UpdateSingleTask,
} from "../models/tasks.js";

/*
This is where the controllers reside this will be called from the routes and will
handle all business logic and most data transformation, It will be mainly be responsible
for calling the models which will access the data layer
*/

//CreateTask: Will create your basic task
export const CreateTask = async (req, res, next) => {
  // We get name from the request body
  const name = req.body.name;
  if (req.body.name === "" || req.body.name === undefined) {
    res.status(400);
  }
  try {
    let taskId = await CreateSingleTask(name);
    res.status(200).json({
      id: taskId,
      message: "Task created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
  return;
};

export const UpdateTask = async (req, res, next) => {
  const name = req.body.name;
  const taskStatus = req.body.status;
  const reqId = req.params.id;
  if (req.body.name === "" || req.body.name === undefined) {
    res.status(400);
  }
  try {
    if (taskStatus > 2 || taskStatus === undefined) {
      res.status(400);
    }
    await UpdateSingleTask(reqId, taskStatus, name);
    res.status(200).json({
      "message":"Task has been updated successfully"
    })
  } catch (e) {
    res.status(500)
  }
   return
};

export const GetAllTasks = async (req, res, next) => {
  let offset = 0;
  let limit = 10;
  let orderBy = "id";
  let sort = "DESC";
  if (req.query.sort !== undefined || req.query.sort !== "") {
    if (["DESC", "ASC"].includes(req.query.sort)) {
      sort = req.query.sort;
    }
  }
  if (req.query.order_by !== undefined || req.query.order_by !== "") {
    if (["id", "created_at", "updated_at"].includes(req.query.order_by)) {
      orderBy = req.query.order_by;
    }
  }
  if (req.query.offset !== undefined || req.query.offset !== "") {
    offset = req.query.offset;
  }
  if (req.query.limit !== undefined) {
    limit = req.query.lmit;
  }
  if (limit > 1000) {
    res.status(500).json({
      error: "limit has to be below 1000",
    });
  }
  try {
    let allTasks = await GetAllTasksFromDb(limit, offset, orderBy, sort);
    res.status(200).json({
      data: allTasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

/*
  TODO:Both of the following API's will need a data range otherwise it will not be very usable and will become slow on large data sets
 */

export const GetTotalMetrics = async (req, res, next) => {
  try {
    let results = await GetAllMetricsFromDb();
    let data = {
      open_tasks: 0,
      inprogress_tasks: 0,
      completed_tasks: 0,
    };
    results.forEach((result) => {
      if (result.status === 0) {
        data.open_tasks = result.statusCount;
      } else if (result.status == 1) {
        data.inprogress_tasks = result.statusCount;
      } else if (result.status == 2) {
        data.inprogress_tasks = result.statusCount;
      }
    });
    res.status(200).json({
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

export const GetMetricsWithTimeline = async (req, res, next) => {
  try {
    let data = {};
    let results = await GetTimelineMetricsFromDb();
    results.forEach((result) => {
      if (!(result.created_day in data)) {
        data[result.created_day] = {
          open_tasks: 0,
          inprogress_tasks: 0,
          completed_tasks: 0,
        };
      }
      if (result.status === 0) {
        data[result.created_day].open_tasks = result.statuscount;
      } else if (result.status == 1) {
        data[result.created_day].inprogress_tasks = result.statuscount;
      } else if (result.status == 2) {
        data[result.created_day].completed_tasks = result.statuscount;
      }
    });
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500);
  }
};
