//Get All Published Frontend and Backend
//Sort price descending order
//pick only name and author


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(() => console.log("Connected mongo succesfully"))
	.catch(() => console.log("Failed connection"));
	
const schema = mongoose.Schema({
	name:String,
	author: String,
	tags : [String],
	date : { type : Date , default : Date.now},
	price : Number,
	isPublished: Boolean
	
});

const Course = mongoose.model('Course', schema);

async function getCourses(){
	//console.log("Get Courses Running");
	return await Course 
		.find({isPublished : true ,tags : { $in : ['frontend','backend']}})
		//Or
		//.find({isPublished : true})
		//.or([{tags : 'frontend'} , {tags: 'backend'}])
		.sort('-price')
		.select('name author');
}

async function printCourses() {
	const courses = await getCourses();
	console.log(courses);
}
printCourses();