const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// Controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

router.post('/add', Controller.insetFurnaceCharges);
router.get('/getFurnaceData', Controller.getFurnaceData);
router.get(
  '/getProductionData?/:Startdate?/:Enddate?/:Shift?',
  Controller.getProductionDataReport
);
router.get(
  '/temparatureReport?/:Startdate?/:Enddate?/:Shift?',
  Controller.getTemperatureReport
);
router.get('/getFurnaceCount', Controller.getRunningCount);
router.get('/ResetFurnace/:ID', Controller.ResetFurnace);
router.get(
  '/furnacedaysReport/day/:Startdate?/:Enddate?/:furnaceId?',
  Controller.getFurnaceDayWiseReport
);
router.get(
  '/furnaceReport?/:Startdate?/:Enddate?/:furnaceId?/:Shift?',
  Controller.getFurnaceReport
);
router.get(
  '/furnaceSummaryReport?/:Startdate?/:Enddate?',
  Controller.getFurnaceSummaryDayWiseReport
);
router.get(
  '/furnaceSummaryShiftReport/:ShiftDate?',
  Controller.getFurnaceSummaryShiftWiseReport
);
router.get('/getOutletData', Controller.getOutletData);
router.post('/setFurnaceLimit', Controller.setLimitAhuParameter);
router.get('/getFurnaceValues', Controller.getFurnaceParametersValue);

module.exports = router;
