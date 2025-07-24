const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const getProjectReports = async (req, res) => {
  const { startDate, endDate, companyId, plantId } = req.body;
  try {
    const getDetails = await db.sequelize.query(
      `PRC_E2M_Get_TaskReports_By_DateRange '${startDate}','${endDate}',${Number(
        companyId
      )},${Number(plantId)}`
    );
    return res
      .status(200)
      .json({ msg: 'Date get Successfully', data: getDetails[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getProjectReports,
};
