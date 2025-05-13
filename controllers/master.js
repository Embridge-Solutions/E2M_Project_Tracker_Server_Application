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
      `EXEC PRC_E2M_Insert_Plant '${PlantName}', '${PlantDescription}'`
    );

    res.status(200).json({ msg: 'Plant inserted successfully', data: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const updatePlant = async (req, res) => {
  const { PlantId, PlantName, PlantDescription } = req.body;

  console.log('req.body', req.body);

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Update_Plant
        ${Number(PlantId)}, 
        '${PlantName}', 
        '${PlantDescription}'`
    );

    console.log('Returned data:', data);
    const updatedPlant = data[0]?.[0];

    res
      .status(200)
      .json({ msg: 'Plant updated successfully', data: updatedPlant });
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deletePlant = async (req, res) => {
  const { PlantId } = req.params;
  console.log('req.params', req.params);

  try {
    const data = await db.sequelize.query(`EXEC PRC_Delete_Plant ${Number(
      PlantId
    )}
`);

    res.status(200).json({ msg: 'Plant deleted successfully', data: data[0] });
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
  const { CompanyName, CompanyDescription } = req.body;

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Insert_Company '${CompanyName}', '${CompanyDescription}'`
    );

    res
      .status(200)
      .json({ msg: 'Company inserted successfully', data: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateCompany = async (req, res) => {
  const { CompanyId, CompanyName, CompanyDescription } = req.body;

  console.log('req.body', req.body);

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Update_Company
        ${Number(CompanyId)}, 
        '${CompanyName}', 
        '${CompanyDescription}'`
    );

    console.log('Returned data:', data);
    const updatedCompany = data[0]?.[0];

    res
      .status(200)
      .json({ msg: 'Company updated successfully', data: updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deleteCompany = async (req, res) => {
  const { CompanyId } = req.params;
  console.log('req.params', req.params);

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_Delete_Company ${Number(CompanyId)}`
    );

    res
      .status(200)
      .json({ msg: 'Company deleted successfully', data: data[0] });
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
  const { Task, StartTime, comp_id, plant_id, CreatedBy } = req.body;
  console.log('req.body', req.body);

  // Parse StartTime and format it correctly for SQL Server
  const date = new Date(StartTime); // Parse the input ISO date string
  const formattedStartTime = date.toISOString().slice(0, 19).replace('T', ' '); // Format as YYYY-MM-DD HH:MM:SS

  try {
    const query = `
      EXEC PRC_E2M_Insert_Task 
        '${Task}', 
        ${comp_id}, 
        ${plant_id}, 
        '${formattedStartTime}', 
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
  const { TaskId, Task, comp_id, plant_id, EndTime } = req.body;

  console.log('req.body', req.body);

  // Convert EndTime into a proper format if it's provided
  let endTimeValue = null;
  if (EndTime && EndTime !== 'null' && EndTime !== 'NULL' && EndTime !== '') {
    const date = new Date(EndTime); // Parse the input ISO date string
    endTimeValue = `'${date.toISOString().slice(0, 19).replace('T', ' ')}'`; // Format as YYYY-MM-DD HH:MM:SS
  } else {
    endTimeValue = 'NULL'; // Handle cases where EndTime is null or empty
  }

  try {
    const data = await db.sequelize.query(
      `EXEC PRC_E2M_Update_Task 
         ${Number(TaskId)}, 
        '${Task}', 
         ${Number(comp_id)}, 
         ${Number(plant_id)},
         ${endTimeValue}`
    );

    console.log('Returned data:', data);
    const updatedTask = data[0]?.[0];

    res
      .status(200)
      .json({ msg: 'Task updated successfully', data: updatedTask });
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
};
