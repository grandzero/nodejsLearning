//Get all published backend courses
//sort them by their name 
//pick only name and author
//display them

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(()=>console.log("Connected to mongodb"))
	.catch(() => console.log("Error occured when connecting to db"));

const courseSchema = mongoose.Schema({
	tags: [String],
	date : { type: Date , default : Date.now},
	name: String,
	author : String,
	isPublished: Boolean,
	price : Number
});

const Course = mongoose.model('Course', courseSchema);


async function getCourses(){
	
	return await Course 
		.find({isPublished: true, tags: 'backend'})
		.sort({name :1 })
		.select({name : 1, author : 1});
		
	
	
}

async function run(){
	const returnVals = await getCourses();
	console.log(returnVals);
}
run();


































/*
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
const courseSchema = new mongoose.Schema({
	tags: [String],
	date : {type : Date , default : Date.now},
	name : String,
	author : String,
	isPublished : Boolean,
	price : Number
	
});
const Course = mongoose.model('Course', courseSchema);
//Get Courses From Db Function
async function getCoursesFromDb(){
	
	const courses = await Course
		.find({isPublished: true})
		.sort({name : 1})
		.select({name: 1, author : 1})
	console.log(courses);
	return courses;
}


app.get('/',(req,res)=>{
	
	mongoose.connect('mongodb://localhost/mongo-exercises')
		.then(() => console.log("Connected to mongodb"))
		.catch(() => console.log("Error occured while connecting mongodb"));
	const courses = getCoursesFromDb();	
	res.send(courses);
	res.end();
	
	
	
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App started at port ${PORT}`);
})
*/