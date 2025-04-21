const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// conntroller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

// routes
router.post('/', Controller.create);
router.get('/', Controller.view);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.archive);
router.post('/changeUserPassword', Controller.changeUserPassword);

module.exports = router;

module.exports = router;
