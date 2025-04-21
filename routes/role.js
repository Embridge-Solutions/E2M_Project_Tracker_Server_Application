const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth');

// controller import
const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}`);

// routes
router.post('/', Controller.create);
router.get('/', Controller.getAll);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.archive);
router.get('/getrole', Controller.getRole);

module.exports = router;
