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

//Updating a document
//Funciton takes id 
async function updateDocQueryFirst(id){
	//Approach : Query first
	//findById()
	//Modifiy its properties
	//save()
	console.log("Inside function");
	const course = await Course.findById(id);
	if(!course){ console.log("Course could not found"); return;};
	console.log("Course Found");
	//Bu şekilde de güncelleyebiliriz
	course.isPublished = true;
	course.author = 'Another Author';
	//Set fonksiyonu kullanarak da
	course.set({
		isPublished: true,
		author : 'Another author'
	});
	//İki yöntem de aynıdır.
	//Burada kullandığımız save fonksiyonu yeni create işlemi esnasında oluşturduğumuz save fonksiyonuyla aynıdır. Bir promise döner o yüzden await yapabiliriz.
	const result = await course.save();
	console.log(result);
}
//updateDocQueryFirst("5a68fdc3615eda645bc6bdec");


//Update first
async function updateDocUpdateFirst(id){

	//Approach: Update first
	//Update Directly
	//Optionally get the updated document
								//.update olursa kursu döndürmez
	const result = await Course.findByIdAndUpdate({_id : id}, {
		//https://docs.mongodb.com/manual/reference/operator/update/ buradaki dökümana gidip desteklenen bütün güncelleme operatörlerini görebiliriz.
		// $currentDate , $inc , $rename, $set $unset...
		$set : {author : 'Bayram', isPublished: false}
	}, {new : true}); // Burada new true diyerek yeni dökümanı döndürmesini sağlıyoruz. Eğer bunu eklemezsek değişmemiş dökümanı döndürür.
	//const course = await Course.update({isPublished: false}); //Böyle yaparak publish olmamış tüm kursları aynı anda güncelleyebiliriz.
	console.log(result);
	
}
updateDocUpdateFirst('5a68fde3f09ad7646ddec17e');














