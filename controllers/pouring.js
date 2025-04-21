const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const pouringReport = async (req, res) => {
  const { startDate, endDate, shift } = req.body;

  try {
    const query =
      startDate && endDate && shift
        ? `EXEC PRC_GET_BATCH_FOR_AUTO_POURING '${startDate}', '${endDate}', ${shift}`
        : startDate && endDate
        ? `EXEC PRC_GET_BATCH_FOR_AUTO_POURING '${startDate}', '${endDate}'`
        : 'EXEC PRC_GET_BATCH_FOR_AUTO_POURING';

    const Data = await db.sequelize.query(query);
    res.status(200).json({ msg: 'Data Found..!', data: Data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getPouringDetails = async (req, res) => {
  const { shift, shiftDate, startDate, endDate } = req.body;

  try {
    const query = 'EXEC PRC_GET_BATCH_DETAILS_FOR_AUTO_POURING ?, ?, ?, ?';
    const params = [
      shift || null,
      shiftDate || null,
      startDate || null,
      endDate || null,
    ];

    const Data = await db.sequelize.query(query, { replacements: params });

    res.status(200).json({ msg: 'Data Found..!', data: Data[0] });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
const getPouring = async (req, res) => {
  try {
    const data = await db.sequelize.query(`PRC_Get_Pouring_Dashboard`);
    return res
      .status(200)
      .json({ msg: 'Furnace Data Get Successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  pouringReport,
  getPouringDetails,
  getPouring,
};
