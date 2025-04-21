const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const insetFurnaceCharges = async (req, res) => {
  const {
    uuid,
    heatNo,
    pigIronLm,
    pigIronSM,
    Hms,
    Lms,
    CiScrap,
    fdyReturns,
    coke,
    FE_SI,
    FE_MO,
    SULPHER,
    COPPER,
    TIN,
    SN_MS,
    FE_SI_MG,
    TOTAL_CHARGE,
  } = req.body;
  try {
    const data = await db.sequelize.query(
      `PRC_Insert_Furnace_Charge_Materials '${uuid}','${heatNo}','${pigIronLm}','${pigIronSM}','${Hms}','${Lms}','${CiScrap}','${fdyReturns}','${coke}','${FE_SI}','${FE_MO}','${SULPHER}','${COPPER}','${TIN}','${SN_MS}','${FE_SI_MG}','${TOTAL_CHARGE}'`
    );
    return res
      .status(200)
      .json({ msg: 'Furnace Charge Material Insert  Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getFurnaceData = async (req, res) => {
  try {
    const data = await db.sequelize.query(`PRC_GET_FURNACE_DASHBOARD_DATA`);
    return res
      .status(200)
      .json({ msg: 'Furnace Data Get Successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getProductionDataReport = async (req, res) => {
  const { Startdate, Enddate, Shift } = req.params;

  try {
    const data = await db.sequelize.query(
      Shift == undefined || Shift == '' || Shift == null
        ? `PRC_GET_SHIFT_DETAILS_FOR_DATE "${Startdate}","${Enddate}"`
        : `PRC_GET_SHIFT_DETAILS_FOR_DATE "${Startdate}","${Enddate}",${Number(
            Shift
          )}`
    );
    res
      .status(200)
      .json({ msg: 'Production data get successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getTemperatureReport = async (req, res) => {
  const { Startdate, Enddate, Shift } = req.params;

  try {
    const data = await db.sequelize.query(
      Shift == undefined || Shift == '' || Shift == null
        ? `PRC_GET_BATCH_DETAILS_FOR_DATE "${Startdate}","${Enddate}"`
        : `PRC_GET_BATCH_DETAILS_FOR_DATE "${Startdate}","${Enddate}",${Number(
            Shift
          )}`
    );
    res
      .status(200)
      .json({ msg: 'Production data get successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getRunningCount = async (req, res) => {
  try {
    const data = await db.sequelize.query(`PRC_GET_RUNNING_COUNT_DETAILS`);
    return res
      .status(200)
      .json({ msg: 'Running Furnace Count Get Successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const ResetFurnace = async (req, res) => {
  const { ID } = req.params;
  try {
    const data = await db.sequelize.query(`PRC_RESET_HEAT_RUNNING_COUNT ${ID}`);
    return res.status(200).json({ msg: 'Furnace Reset Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getFurnaceDayWiseReport = async (req, res) => {
  const { Startdate, Enddate, furnaceId } = req.params;

  try {
    const data = await db.sequelize.query(
      furnaceId !== undefined
        ? `PRC_GET_FURNACE_SHIFT_DATA "${Startdate}","${Enddate}",${Number(
            furnaceId
          )}`
        : `PRC_GET_FURNACE_SHIFT_DATA "${Startdate}","${Enddate}"`
    );
    res
      .status(200)
      .json({ msg: 'Furnace Day Wise data get successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getFurnaceReport = async (req, res) => {
  const { Startdate, Enddate, furnaceId, Shift } = req.params;

  try {
    const data = await db.sequelize.query(
      `PRC_GET_FURNACE_REPORT_DATA "${Startdate}","${Enddate}",${Number(
        furnaceId
      )},${Number(Shift)}`
    );
    res.status(200).json({
      msg: 'Furnace data  Shift Wise get successfully',
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getFurnaceSummaryDayWiseReport = async (req, res) => {
  const { Startdate, Enddate } = req.params;

  try {
    const data = await db.sequelize.query(
      `PRC_GET_FURNACE_REPORT_DATEWISE_DETAILS "${Startdate}","${Enddate}"`
    );
    res.status(200).json({
      msg: 'Summary Furnace Data Day Wise get successfully',
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getFurnaceSummaryShiftWiseReport = async (req, res) => {
  const { ShiftDate } = req.params;

  try {
    const data = await db.sequelize.query(
      `PRC_GET_FURNACE_REPORT_SHIFTWISE_DETAILS "${ShiftDate}"`
    );
    res.status(200).json({
      msg: 'Summary Furnace Data Shift Wise get successfully',
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
const getOutletData = async (req, res) => {
  try {
    const data = await db.sequelize.query(
      `PRC_GET_FURNACE_PATH_WISE_OUTLET_WATER_TEMP_DASHBOARD_DATA`
    );
    return res
      .status(200)
      .json({ msg: 'Furnace Data Get Successfully', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const setLimitAhuParameter = async (req, res) => {
  const {
    setLimitType,
    // common Value start
    VIP_INLET_WATER_PRESSURE,
    VIP_INLET_WATER_TEMP,
    VIP_PHE_SECONDARY_INLET_WATER_PRESSURE,
    VIP_PHE_SECONDARY_INLET_WATER_TEMP,
    HPU_TANK_OIL_TEMP,
    //  common Value End

    //  furnace 2 value start
    fur2_topcooling_turnwatertemp,
    fur2_path1_watertemp,
    fur2_path2_watertemp,
    fur2_path3_watertemp,
    fur2_path4_watertemp,
    fur2_path5_watertemp,
    fur2_path6_watertemp,
    fur2_coolleadpath1_watertemp,
    fur2_coolleadpath2_watertemp,
    fur2_inlet_waterpressure,
    fur2_inlet_watertemp,
    //  furnace 2 value end

    //  furnace 3 value start
    fur3_topcooling_turnwatertemp,
    fur3_path1_watertemp,
    fur3_path2_watertemp,
    fur3_path3_watertemp,
    fur3_path4_watertemp,
    fur3_path5_watertemp,
    fur3_path6_watertemp,
    fur3_coolleadpath1_watertemp,
    fur3_coolleadpath2_watertemp,
    fur3_inlet_waterpressure,
    fur3_inlet_watertemp,
    //  furnace 3 value end
  } = req.body;

  try {
    if (Number(setLimitType) === 1) {
      const data = await db.sequelize.query(
        `PRC_Set_Common_Parameter_Limit ${Number(
          VIP_INLET_WATER_PRESSURE
        )},${Number(VIP_INLET_WATER_TEMP)},${Number(
          VIP_PHE_SECONDARY_INLET_WATER_PRESSURE
        )},${Number(VIP_PHE_SECONDARY_INLET_WATER_TEMP)},${Number(
          HPU_TANK_OIL_TEMP
        )}`
      );
    } else if (Number(setLimitType) === 2) {
      const dataTwo = await db.sequelize.query(
        `PRC_Set_Fur2_Parameter_Limit ${Number(
          fur2_topcooling_turnwatertemp
        )},${Number(fur2_path1_watertemp)},${Number(
          fur2_path2_watertemp
        )},${Number(fur2_path3_watertemp)},${Number(
          fur2_path4_watertemp
        )},${Number(fur2_path5_watertemp)},${Number(
          fur2_path6_watertemp
        )},${Number(fur2_coolleadpath1_watertemp)},${Number(
          fur2_coolleadpath2_watertemp
        )},${Number(fur2_inlet_waterpressure)},${Number(fur2_inlet_watertemp)}`
      );
    } else if (Number(setLimitType) === 3) {
      const dataThree = await db.sequelize.query(
        `PRC_Set_Fur3_Parameter_Limit ${Number(
          fur3_topcooling_turnwatertemp
        )},${Number(fur3_path1_watertemp)},${Number(
          fur3_path2_watertemp
        )},${Number(fur3_path3_watertemp)},${Number(
          fur3_path4_watertemp
        )},${Number(fur3_path5_watertemp)},${Number(
          fur3_path6_watertemp
        )},${Number(fur3_coolleadpath1_watertemp)},${Number(
          fur3_coolleadpath2_watertemp
        )},${Number(fur3_inlet_waterpressure)},${Number(fur3_inlet_watertemp)}`
      );
    } else {
      // console.log('Invalid setLimitType:', setLimitType);
      return res.status(400).json({ msg: 'Invalid Limit Type' });
    }
    return res.status(200).json({ msg: 'Furnace Limit Set Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getFurnaceParametersValue = async (req, res) => {
  try {
    const commonData = await db.sequelize.query(
      `PRC_GET_COMMON_PARAMERTERS_LIMIT`
    );
    const Fur1Data = await db.sequelize.query(`PRC_GET_Fur2_PARAMERTERS_LIMIT`);
    const Fur2Data = await db.sequelize.query(`PRC_GET_Fur3_PARAMERTERS_LIMIT`);
    return res.status(200).json({
      msg: 'Data Get Successfully',
      cData: commonData[0],
      f2Data: Fur1Data[0],
      f3Data: Fur2Data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  insetFurnaceCharges,
  getFurnaceData,
  getProductionDataReport,
  getTemperatureReport,
  getRunningCount,
  ResetFurnace,
  getFurnaceDayWiseReport,
  getFurnaceReport,
  getFurnaceSummaryDayWiseReport,
  getFurnaceSummaryShiftWiseReport,
  getOutletData,
  setLimitAhuParameter,
  getFurnaceParametersValue,
};
