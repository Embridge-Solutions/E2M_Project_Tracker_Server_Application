const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const getPlant = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_E2M_Get_Plant');
    return res
      .status(200)
      .json({ msg: 'SuccessFully Get the Plant Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const addPlant = async (req, res) => {
  const { PlantName, PlantDescription } = req.body;

  try {
    const data = await db.sequelize.query(
      `PRC_E2M_Insert_Plant '${PlantName}', '${PlantDescription}'`
    );

    res.status(200).json({ msg: 'Plant inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const updatePlant = async (req, res) => {
  const { PlantId, PlantName, PlantDescription } = req.body;
  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Update_Plant
        ${Number(PlantId)}, 
        '${PlantName}', 
        '${PlantDescription}'`
    );
    res.status(200).json({ msg: 'Plant updated successfully' });
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deletePlant = async (req, res) => {
  const { PlantId } = req.params;
  try {
    const data = await db.sequelize.query(`EXEC PRC_Delete_Plant ${Number(
      PlantId
    )}
`);
    res.status(200).json({ msg: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getCompany = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_E2M_Get_Company');
    return res
      .status(200)
      .json({ msg: 'Successfully got the Company data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const addCompany = async (req, res) => {
  const { CompanyName, CompanyDescription, plantId } = req.body;
  try {
    const data = await db.sequelize.query(
      `PRC_E2M_Insert_Company '${CompanyName}', '${CompanyDescription}','${plantId}'`
    );
    res.status(200).json({ msg: 'Company inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateCompany = async (req, res) => {
  const { CompanyId, CompanyName, CompanyDescription, plantId } = req.body;
  try {
    await db.sequelize.query(
      `PRC_E2M_Update_Company ${Number(
        CompanyId
      )},'${CompanyName}', '${CompanyDescription}','${plantId}'`
    );
    res.status(200).json({ msg: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deleteCompany = async (req, res) => {
  const { CompanyId } = req.params;
  try {
    const data = await db.sequelize.query(
      `EXEC PRC_Delete_Company ${Number(CompanyId)}`
    );
    res.status(200).json({ msg: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getTask = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_E2M_Get_Task');
    return res
      .status(200)
      .json({ msg: 'SuccessFully Get the Task Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const addTask = async (req, res) => {
  const { Task, comp_id, plant_id, CreatedBy } = req.body;
  console.log('req.body', req.body);

  try {
    const query = `
      EXEC PRC_E2M_Insert_Task 
        '${Task}', 
        ${comp_id}, 
        ${plant_id}, 
        '${CreatedBy}'
    `;

    console.log('Executing query:', query);

    const data = await db.sequelize.query(query);

    res.status(200).json({ msg: 'Task inserted successfully', data: data[0] });
  } catch (error) {
    console.error('Error executing SP:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateTask = async (req, res) => {
  const { TaskId, Task, comp_id, plant_id, EndTime, StartTime } = req.body;

  console.log('req.body', req.body);

  // Validate mandatory fields
  if (!TaskId || !Task || !comp_id || !plant_id) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  // ✅ Format date to IST (YYYY-MM-DD HH:MM:SS)
  const formatISTDateForSQL = (value) => {
    if (!value || value === 'null' || value === 'NULL' || value === '') {
      return 'NULL';
    }

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // Convert to IST (+5:30)
      const istOffsetMs = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(date.getTime() + istOffsetMs);

      // Format as 'YYYY-MM-DD HH:MM:SS'
      const formatted = istDate.toISOString().slice(0, 19).replace('T', ' ');
      return `'${formatted}'`;
    }

    return 'NULL'; // fallback
  };

  const endTimeValue = formatISTDateForSQL(EndTime);
  const startTimeValue = formatISTDateForSQL(StartTime);

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Update_Task 
         ${Number(TaskId)}, 
         '${Task}', 
         ${Number(comp_id)}, 
         ${Number(plant_id)},
         ${endTimeValue},
         ${startTimeValue}`
    );

    console.log('Returned data:', data);
    const updatedTask = data[0]?.[0];

    res.status(200).json({
      msg: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
      details: error.parent?.message || error.original?.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { TaskId } = req.params;
  console.log('req.params', req.params);

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_Delete_Task ${Number(TaskId)}`
    );

    res.status(200).json({ msg: 'Task deleted successfully', data: data[0] });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const addStartTime = async (req, res) => {
  const { TaskID, StartTime } = req.body;

  // Debug log to verify input
  console.log('Received TaskID:', TaskID);
  console.log('Received StartTime:', StartTime);

  if (!TaskID || !StartTime) {
    return res.status(400).json({ msg: 'TaskID and StartTime are required' });
  }

  try {
    const date = new Date(StartTime);
    const pad = (n) => n.toString().padStart(2, '0');
    const localDateTimeString = `${date.getFullYear()}-${pad(
      date.getMonth() + 1
    )}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}:${pad(date.getSeconds())}`;

    const query = `
      EXEC PRC_E2M_Insert_Task_StartTime 
        ${TaskID}, 
        '${localDateTimeString}'
    `;

    console.log('Executing query:', query);

    const data = await db.sequelize.query(query);
    res
      .status(200)
      .json({ msg: 'StartTime updated successfully', data: data[0] });
  } catch (error) {
    console.error('Error updating StartTime:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getPlant,
  addPlant,
  updatePlant,
  deletePlant,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  addStartTime,
};
