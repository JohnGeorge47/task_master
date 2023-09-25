import { Sequelize, DataTypes, QueryTypes } from "sequelize";
import { sequelize } from "../../databse/db.js";

const Task = sequelize.define(
  "task",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
);

export const CreateSingleTask = async function (name) {
  try {
    const taskDetail = await Task.create({ name: name, status: 0 });
    return taskDetail.id;
  } catch (e) {
    throw e;
  }
};

export const UpdateSingleTask = async function (taskId, status, name) {
  try {
    await Task.update(
      {
        name: name,
        status: status,
        updated_at: new Date(),
      },
      {
        where: {
          id: taskId,
        },
      },
    );
  } catch (e) {
    throw e;
  }
};
export const GetAllTasksFromDb = async function (limit, offset, order, sort) {
  try {
    return await Task.findAll({
      raw: true,
      limit: limit,
      offset: offset,
      order: [[order, sort]],
    });
  } catch (e) {
    throw e;
  }
};

export const GetAllMetricsFromDb = async function () {
  try {
    return await Task.findAll({
      raw: true,
      attributes: ["status", [sequelize.fn("COUNT", "status"), "statusCount"]],
      group: "status",
    });
  } catch (e) {
    throw e;
  }
};

export const GetTimelineMetricsFromDb = async function () {
  try {
    return await sequelize.query(
      `SELECT count(*) as statuscount,status,DATE_TRUNC ('day', created_at)::date as created_day from tasks Group by DATE_TRUNC('day', created_at),status order by created_day`,
      {
        type: QueryTypes.SELECT,
      },
    );
  } catch (e) {
    throw e;
  }
};
