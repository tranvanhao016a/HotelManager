const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

const customerController = new CustomerController();

router.post('/', customerController.createCustomer.bind(customerController));
router.get('/', customerController.getCustomers.bind(customerController));
router.get('/:id', customerController.getCustomerById.bind(customerController));
router.put('/:id', customerController.updateCustomer.bind(customerController));
router.delete('/:id', customerController.deleteCustomer.bind(customerController));

module.exports = router; 