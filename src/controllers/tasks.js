import {
  CreateSingleTask,
  GetAllMetricsFromDb,
  GetAllTasksFromDb,
  GetTimelineMetricsFromDb,
  UpdateSingleTask,
} from "../models/tasks.js";

export const CreateTask = async (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  if (req.body.name == "" || req.body.name == undefined) {
    res.status(400);
  }
  try {
    await CreateSingleTask(name);
  } catch (e) {
    console.log(e);
  }

  console.log("name");
  res.status(200).send(`Task has been created successfully`);
};

export const UpdateTask = async (req, res, next) => {
  const name = req.body.name;
  const taskStatus = req.body.status;
  const reqId = req.params.id;
  if (req.body.name === "" || req.body.name ===undefined) {
    res.status(400);
  }
  try {
    if(taskStatus>2 || taskStatus===undefined){
      res.status(400)
    }
    await UpdateSingleTask(reqId, taskStatus, name);
  } catch (e) {
    console.log(e);
  }

  console.log("name");
  res.status(200).send(`User deleted with ID:`);
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
  if (req.query.limit!==undefined){
    limit=req.query.lmit
  }
  try {
    let allTasks = await GetAllTasksFromDb(limit, offset, orderBy, sort);
    console.log(allTasks);
    res.status(200).json({
      data: allTasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

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
    console.log(results);
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
    console.log(data);
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500);
  }
};
