//All Published Courses
//price 15 or more
//or contains "by"

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongo-exercises")
	.then(()=> console.log("Connected mongoose"))
	.catch(() => console.log("Fail during connect"));
	
const sc = mongoose.Schema({
	name:String,
	author: String,
	tags : [String],
	isPublished: Boolean,
	price: Number,
	date : {type : Date , default : Date.now}
});
const Course = mongoose.model('Course', sc);

async function getResults(){
	
	return await Course 
	.find({isPublished: true})
	.or([{price : {$gte : 15}}, {name : /.*by.*/i}])
}

async function printRes() {
	const courses = await getResults();
	console.log(courses);
}

printRes();