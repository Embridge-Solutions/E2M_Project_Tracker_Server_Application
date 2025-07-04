const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const getTaskName = async (req, res) => {
  try {
    const getTask = await db.sequelize.query(`PRC_E2M_GET_TaskDetails`);
    return res
      .status(200)
      .json({ msg: 'Task get Successfully', data: getTask[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const addTaskName = async (req, res) => {
  const { taskName, projectId } = req.body;
  try {
    const insertTask = await db.sequelize.query(
      `PRC_E2M_Insert_TaskName '${taskName}',${Number(projectId)}`
    );
    return res
      .status(200)
      .json({ msg: 'Task Added Successfully', data: insertTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { getTaskName, addTaskName };
