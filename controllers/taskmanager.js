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

const startTimer = async (req, res) => {
  const { taskId, startTime, parentTaskId } = req.body;
  console.log('req.body', req.body);
  try {
    const taskTimer = await db.sequelize.query(
      `PRC_E2M_Start_Task_Timer ${Number(taskId)},'${startTime}',${Number(
        parentTaskId
      )}`
    );
    return res.status(200).json({ msg: 'Timer Start Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const singleTaskDetails = async (req, res) => {
  const { parentTaskId } = req.body;

  try {
    const taskDetails = await db.sequelize.query(
      `PRC_E2M_Get_AllDetails_SingleTask ${Number(parentTaskId)}`
    );
    return res
      .status(200)
      .json({ msg: 'Task Details Get Successfully', data: taskDetails[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const holdTask = async (req, res) => {
  const { Id, pauseEndTime, holdReason } = req.body;
  try {
    const holdData = await db.sequelize.query(
      `PRC_E2M_Holding_Task ${Number(Id)},'${pauseEndTime}','${holdReason}'`
    );
    res.status(200).json({ msg: 'Task Hold Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getTaskName,
  addTaskName,
  startTimer,
  singleTaskDetails,
  holdTask,
};
