const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

router.get('/getPlant', Controller.getPlant);
router.post('/addPlant', Controller.addPlant);
router.put('/updatePlant', Controller.updatePlant);
router.delete('/deletePlant/:PlantId', Controller.deletePlant);

router.get('/getCompany', Controller.getCompany);
router.post('/addCompany', Controller.addCompany);
router.put('/updateCompany', Controller.updateCompany);
router.delete('/deleteCompany/:CompanyId', Controller.deleteCompany);

router.get('/getTask', Controller.getTask);
router.post('/addTask', Controller.addTask);
router.put('/updateTask', Controller.updateTask);
router.delete('/deleteTask/:TaskId', Controller.deleteTask);

module.exports = router;
