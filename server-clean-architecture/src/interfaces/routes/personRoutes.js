const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');

const personController = new PersonController();

// Routes chung
// router.post('/', personController.createPerson.bind(personController));
router.get('/:id', personController.getPersonById.bind(personController));
router.put('/:id', personController.updatePerson.bind(personController));
router.delete('/:id', personController.deletePerson.bind(personController));

// Routes cho User
// router.get('/type/users', personController.getUsers.bind(personController));

// Routes cho Staff
router.get('/type/staffs', personController.getStaffs.bind(personController));
router.patch('/:id/status', personController.updatePersonStatus.bind(personController));

module.exports = router; 