const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(() => console.log("Connected to db"))
	.catch(() => console.error("Failed to connect db"));
	
const sc = mongoose.Schema({
	name: String,
	author: String,
	tags : [String],
	Date : {type : Date , default : Date.now},
	isPublished: Boolean,
	price : Number,
	_id : String
	
});
//Eğer bu şemada _id String diye belirtmezsek update etmeye çalışırken o id ile bulamayacak ve hep null gelecek

const Course = mongoose.model('Course', sc);

async function removeCourse(id){
			//.deleteMany fonksiyonu kullanarak birden fazla sileibliriz.
	//const result = await Course.deleteOne({_id : id}); // Burada da isPublished: false olanları silebiliriz. Bu fonksiyonla bulup ispublished false olanlardan bir tanesini silecek.
	
	//Eğer dökümanı bulup silip döndürmek istiyorsak : 
	//Eğer istediğimiz kurs silinmişse bu id null döndürür.
	const course = await Course.findByIdAndRemove(id);
	console.log(course);
}
removeCourse("5a68fdc3615eda645bc6bdec");