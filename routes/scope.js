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
router.get('/', Controller.viewScope);
// router.get('/', Controller.view);
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.archive);
module.exports = router;

module.exports = router;
