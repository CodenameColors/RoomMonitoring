var promise = require('bluebird');

var options = {
	//init options
	promiseLib: promise
}

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://antonio:Am19528974@localhost:5432/room_monitoring';
var db = pgp(connectionString);

//defines the queries calls that are defined as the routes.
module.exports = {
	
//	[route name]	[method name]
	getAllPersons: getAllPersons,
	getOnePerson: getOnePerson,
	createPerson: createPerson,
	updatePerson: updatePerson,
	removePerson: removePerson

};

function getAllPersons(req, res, next){
//console.log("test");
	db.any('select * from person') //do this and get results
	.then(function(data){
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retreived all Persons'
		});
	})
	.catch(function(data){
		return next (err);
	});
}

function getOnePerson(req, res, next){
console.log("test");	
var personID = parseInt(req.params.id); 
	console.log(personID);
	db.one('select * from person where id = $1', personID) //do this and get results
	
	.then(function(data){
	res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retreived one person' 
		});
	})
	.catch(function(data){
		return next (err);
	});
}

function createPerson(req, res, next){
	req.body.id = parseInt(req.body.id);
	req.body.importance = parseInt(req.body.importance);
	console.log(req.body.importance);	
	
	//set up the SQL query
	db.result('insert into person(fname, lname, importance)' + 
	'values(${fname}, ${lname}, ${importance}) returning id', req.body)
	
	.then( function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted one person',
			id: data.rows[0].id
		});
	})
	.catch(function(err) {
		return next(err);
	});
}

function updatePerson(req, res, next){
	db.none('update person set fname =$1, lname = $2, importance =$3 \
	where id=$4' ,
	[req.body.fname, req.body.lname, req.body.importance, req.param.id])

	.then (function(){
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated person record',
			id: req.param.id
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function removePerson(req, res, next){
	var personID = parseInt(req.param.id);
	db.result('delete from person where id = $1', parseInt(req.params.id))

	.then( function(result){
		res.status(200)
		.json({
			status: 'success',
			message: 'Removed ${result.rowCount} person record',
			id: req.params.id
		});
	})
	.catch(function(err) {
		return next(err);
	});
}