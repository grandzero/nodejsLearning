//All Published Courses
//price 15 or more
//or contains "by"

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongo-exercises")
	.then(()=> console.log("Connected mongoose"))
	.catch(() => console.log("Fail during connect"));
	
const sc = mongoose.Schema({
	dateInserted : {type : Date , default : Date.now},
	json : Object
});
const Course = mongoose.model('Course', sc);

async function getResults(){
	const testObj = {
		name: "Bayram",
		test : "test Area",
		age : 27
	}
	 const newRecord =  new Course({
		dateInserted: Date.now(),
		json : testObj
	});
	await newRecord.save();
}

async function printRes() {
	await getResults();
	console.log("Completed");
}

printRes();