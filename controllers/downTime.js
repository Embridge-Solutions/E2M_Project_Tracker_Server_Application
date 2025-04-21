const { poolPromise, db } = require('../models/index');
const sql = require('mssql');
const moment = require('moment');

const getDownTime = async (req, res) => {
  const { id } = req.params;

  try {
    const downtime = await db.sequelize.query(`PRC_GET_IDLETIME_DETAILS ${id}`);

    const data = downtime[0];
    let gapData = [];
    data?.map((da) => {
      gapData.push({
        id: da.id,
        NPSTART: da.NPSTART,
        NPEND: da.NPEND,
        // DownStart:(da.DownStart).split('T'),

        //  DownStart:moment(da.DownStart).local().format('YYYY-MM-DD HH:mm:ss'),
        //   DownEnd: moment(da.DownEnd).format('YYYY-MM-DD HH:mm:ss'),
        NETNPTIME: da.NETNPTIME,
        EQUIPMENTID: da.EQUIPMENTID,
      });
    });
    res.status(200).json({ msg: 'DownTime Fetch...', data: gapData });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
    console.error(err);
  }
};

const getReason = async (req, res) => {
  try {
    const reason = await db.sequelize.query(`PRC_GET_NPT_REASON`);
    return res.status(200).json({ msg: 'Reason Found..', data: reason });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const updateDownTimeReason = async (req, res) => {
  const { DownTimeId, Reason, RootCause, usedOee } = req.params;
  try {
    const pool = await poolPromise;
    const DownTimeUpdateReason = await pool
      .request()
      .input('pIN_Id', sql.Int, Number(DownTimeId))
      .input('pIN_Reason', sql.VarChar, Reason)
      .input('pIN_RootCause', sql.VarChar, RootCause)
      .input('pIN_UsedForOEE', sql.Char, usedOee)
      .execute('PRC_UPDATE_NPT_REASON_MASTER');

    const data = DownTimeUpdateReason.recordset;
    return res.status(200).json({ msg: ' Update Successfully', data: data });
  } catch (error) {
    console.log(error.originalError);
    res.status(500).json({ msg: 'server error' });
  }
};
const deleteDownTimeReason = async (req, res) => {
  const { DownTimeId } = req.params;
  try {
    const pool = await poolPromise;
    const DownTimeDeleteReason = await pool
      .request()
      .input('pIN_DownTimeId', sql.Int, Number(DownTimeId))
      .execute('PRC_Delete_Downtime_Reason');
    const data = DownTimeDeleteReason.recordset;
    return res.status(200).json({ msg: ' Deleted Successfully', data: data });
  } catch (error) {
    console.log(error.originalError);
    res.status(500).json({ msg: 'server error' });
  }
};

const updateReason = async (req, res) => {
  const value = req.body;
  console.log('req.body', req.body);
  try {
    for (let i = 0; i < value.length; i++) {
      const pool = await poolPromise;
      await pool
        .request()
        .input('pIN_reasonId', sql.Int, value[i].reasonID)
        .input('pIN_ID', sql.Int, value[i].id)
        .input('pIN_starttime', sql.NVarChar, value[i].startTime)
        .input('pIN_endtime', sql.NVarChar, value[i].endTime)
        .execute(`PRC_Update_NptREASON`);
    }
    return res.status(200).json({ msg: 'Update SuccessFully...!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const createReason = async (req, res) => {
  const { newReason, rootCause, usedOee } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIN_Reason', sql.VarChar(255), newReason)
      .input('pIN_RootCause', sql.VarChar(255), rootCause)
      .input('pIN_UsedForOEE', sql.VarChar(25), usedOee)
      .execute(`PRC_INSERT_NPT_REASON_MASTER`);
    return res.status(200).json({ msg: 'New Reason Add Successfully...!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getDownTimeReport = async (req, res) => {
  const { equipmentId, startDate, endDate } = req.params;

  try {
    const downtimeReport = await db.sequelize.query(
      `prc_get_reports_downtime ${Number(
        equipmentId
      )},'${startDate}','${endDate}'`
    );
    res
      .status(200)
      .json({ msg: 'DownTime Report Fetch...', data: downtimeReport[0] });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
    console.error(err);
  }
};

module.exports = {
  getDownTime,
  updateReason,
  getReason,
  createReason,
  updateDownTimeReason,
  deleteDownTimeReason,
  getDownTimeReport,
};
