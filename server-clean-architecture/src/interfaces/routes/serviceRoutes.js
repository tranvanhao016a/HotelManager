const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

const serviceController = new ServiceController();

router.post('/', serviceController.createService.bind(serviceController));
router.get('/', serviceController.getServices.bind(serviceController));
router.put('/:id', serviceController.updateService.bind(serviceController));
router.delete('/:id', serviceController.deleteService.bind(serviceController));

module.exports = router; 