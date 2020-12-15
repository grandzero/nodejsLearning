const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect mongodb'));
const courseSchema = new mongoose.Schema({
	name: {type: String, 
		required: true,//Bu sayede bir required validation yapmış oluyoruz.
		minlength: 5,
		maxlength: 255
		},
	category: {
		type: String,
		required: true,
		enum : ['web', 'mobile', 'network'], // Bu kategori alanı sadece bu üç değeri alabilir.
		lowercase: true, // Mongoose bunu kendi kendine lowercase çevirir
		//uppercase : true,
		trim: true
	}, 
	author: String,
	//tags: [String], // Burada her değerin keyi 0,1,2 şeklinde olur  ve value olarak da stringi olur
	tags : {
		type: Array,
		validate : {
			isAsync: true,//Validate objesine bu keyi true ekleyerek validator fonksiyonunun asenkron çalışan bir fonksiyon olacağını belirtmiş oluyoruz.
			validator : function(v, callback) {
				// Do some async work
				// İçeride asenkron işi yaptıktan sonra callback diye belirttiğimiz fonksiyona boolean return değerini verip çağırıyoruz.
				setTimeout(() => {
					const result = v && v.maxlength > 0;
					callback(result);
				}, 4000);
				
				//return v && v.length > 0; // Burada required kullanamıyoruz çünkü required ile boş bir array de gönderebilir. Ama bu sayede bir validator fonksiyonu belirleyebiliyoruz. Ve en az 1 tane tag olmasını isteidiğimizi belirtmiş oluyoruz. V'nin eğer bir değeri varsa ve 0 dan büyükse true döndürür
			},
			message: 'A course should have at least one tag'
		}
	},
	date: {type: Date, default: Date.now},// Böylece bu alanın tipi Date olacak ve default değeri de Date.now olacak.
	isPublished: Boolean,
	price: {
		type: Number,
		required: function() { // Bu fonksiyon arrow function olmuyor çünkü this objesini kullanabilmemiz gerekiyor.
			return this.isPublished; // Burada boolean döndüren bir fonksiyon kullanabiliriz. Örnek olarak this ile bu objeye erişiyoruz ve eğer bu objenin isPublished kısmı true ise bu alan required oluyor.
		},
		min: 10,
		max: 250,
		get : v => Math.round(v), // Her zaman çekilen değer round edilir
		set : v => Math.round(v) // Burada arrow function vererek gelen value'nun her zaman round edilerek kayıt edilmesini sağlıyoruz. Eğer daha önceden kayıt edilmiş veriler varsa db'de onları da round ederek getirir.
	}
	
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse(){
	const course = new Course({
	name: 'JoshNew',
	author: 'John Doe',
	tags: null,
	isPublished: true,
	category: 'web',
	price : 100
});
    try{
    const result = await course.save();// Bu promisede bir rejection olabilir. Bunu handle etmek için try catch içine aldık. Eğer required bir alan boş gelirse burada hata çıkacak.
	
	//Validation için bir diğer yöntem de validate fonksiyonudur.
    /*course.validate((err) => {
		if(err){} // Bu kod biraz daha karmaşıktır ama burada validation işlemleri yapabiliriz.Bir sorun varsa bir işlem yoksa başka bir işlem yapabiliriz.
	}); // Burada void promise döner. Bunu result atamaya gerek yoktur.*/
    }catch(ex){
		console.log(ex.message);
		//ex.errors // Burada obje içindeki her bir sorunlu alan için bir tag oluşur
		for(field in ex.errors){
			console.log(ex.errors[field].message);//Buradaki hata mesajı çıkar
		}
		//ex.errors.tags
		//ex.errors.categories
    }
};
createCourse();
/*
async function getCourses(){

	const courses = await Course
		.find({price : { $in : [10, 15, 20]}}) 
		.limit(10)
		.sort( {name: 1} )
		.select({name: 1, tags : 1});
	console.log(courses);
}
*/











