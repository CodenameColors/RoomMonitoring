var express = require('express');
var router = express.Router();

var db = require('../queries'); //sets up reference to file


router.get('/person', db.getAllPersons);
router.get('/person/:id', db.getOnePerson);
router.post('/person', db.createPerson);
router.put('/person/:id', db.updatePerson);
router.delete('/person/:id', db.removePerson);

/*
*	SENSOR ROUTES
*/


module.exports = router;
