var express = require('express');
var ctrl = require('./medicalRecord.controller');
var router = express.Router();

router.post('/add', ctrl.addMedicalRecord);
router.post('/update', ctrl.updateMedicalRecord);
router.get('/get', ctrl.getMedicalRecord);

module.exports = router;
