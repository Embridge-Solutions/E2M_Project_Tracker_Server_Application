const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

router.get('/getTaskDetails', Controller.getTaskName);
router.post('/insertTaskName', Controller.addTaskName);

module.exports = router;
