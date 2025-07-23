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
      `PRC_Delete_Company ${Number(CompanyId)}`
    );
    res.status(200).json({ msg: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projectData = await db.sequelize.query(`PRC_E2M_Get_Projects`);
    res
      .status(200)
      .json({ msg: 'Data fetched successfully', data: projectData[0] });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const addProjectNew = async (req, res) => {
  const { projectName, projectDesc, companyId, plantId } = req.body;
  try {
    await db.sequelize.query(
      `PRC_E2M_Insert_Projects '${projectName}','${projectDesc}',${Number(
        companyId
      )},${Number(plantId)}`
    );
    res.status(200).json({ msg: 'Project Added successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateProject = async (req, res) => {
  const { Id, projectName, projectDesc } = req.body;
  try {
    const update = await db.sequelize.query(
      `PRC_E2M_Update_Projects ${Number(Id)},'${projectName}','${projectDesc}'`
    );
    res.status(200).json({ msg: 'Project Updated Successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deleteProject = async (req, res) => {
  const { Id } = req.params;
  try {
    const deleteProject = await db.sequelize.query(
      `PRC_E2M_Delete_Projects ${Number(Id)}`
    );
    res.status(200).json({ msg: 'Project Delete Successfully' });
  } catch (error) {
    console.error('Error:', error);
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
  getProjects,
  addProjectNew,
  updateProject,
  deleteProject,
};
