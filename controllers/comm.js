const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const getPlantOpt = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_E2M_Get_PlantNames');
    return res
      .status(200)
      .json({ msg: 'SuccessFully Get the Plant Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getCompanyOpt = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_E2M_Get_CompanyNames');
    return res
      .status(200)
      .json({ msg: 'SuccessFully Get the Plant Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const subDepartment = async (req, res) => {
  try {
    const data = await db.sequelize.query(`Get_SUB_Department`);
    res.status(200).json({ msg: 'subDepartment Found !', data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getPlantOpt,
  getCompanyOpt,
  subDepartment,
};
