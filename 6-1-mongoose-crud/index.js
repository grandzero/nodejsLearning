const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect mongodb'));// Başka bir environment için çalışırken connection string config dosyasından gelmeli
//Bu database oluşturmadıysak mongodb otomatik olarak bu db'yi bize oluşturacak. ve burası bize bir promise döndürür.

//Bağlantıdan sonra yapmamız gereken şey bir şema oluşturmaktır.
//Relational db'de table ve rowlar vardır, burada ise collections ve documents vardır. Schemayı bu dökümanın özelliklerini şeklini vs belirlemek için kullanırız.
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String], // Burada her değerin keyi 0,1,2 şeklinde olur  ve value olarak da stringi olur
	date: {type: Date, default: Date.now},// Böylece bu alanın tipi Date olacak ve default değeri de Date.now olacak.
	isPublished: Boolean
	
});
//Schema types : String, Number, Date, Buffer, Boolean, ObjectID(Unique id), Array

//Şimdi şemayı oluşturduk ve bir model oluşturmamız gerekiyor.
//Bunlar şema-model yapısı class-object konusuna benzer. Biri temel şemadır diğeri onun örneğidir.
const Course = mongoose.model('Course', courseSchema);// Bu Coursenin büyük olması bunun bir class olduğunu gösterir.Şimdi objesini oluşturacağız.
//Bu obje bize bir döküman oluşturma imkanı sağlar. Böylece dökümanın bütün verilerini hazırlamış olduk.
async function createCourse(){
	const course = new Course({
	name: 'Angular Course',
	author: 'John Doe',
	tags: ['Angular','frontend'],
	isPublished: true
});
const result = await course.save();//Bu bir asenkron işlemdir.Bize bir promise döndürür. Burada dönen result bize o döküman için kullanılan unique bir id döndürür. Bu id mongo tarafından döndürülür.
console.log(result);
};

//createCourse(); bu fonksiyon ile döküman oluşturmuş olduk.

//DB'deki kayıtları görmek için şöyle yapıyoruz
async function getCourses(){
	//Mongoose mongodb operatörleri üzerine kurulu olduğu için mongodb operatörlerini kullanabiliriz.
	// eq (equal)
	// ne (not equal)
	// gt (greater than)
	// gte (greater than or equal to)
	// lt (less than)
	// lte (less than or equal to)
	// in
	// nin (not in)
	const courses = await Course
		.find({price : { $in : [10, 15, 20]}}) // Burada da sadece bu değerlere sahip dökümanları almak istediğimizi belirtmiş oluyoruz.
		.limit(10)
		.sort( {name: 1} )
		.select({name: 1, tags : 1});
		//.find({price : { $gt : 10, $lte : 20}}) // Örnek olarak belli bir fiyatın üzerindeki kursları bulmak istiyor olalım. Bunun için değer kısmına bir obje veriyoruz ve operatörlerin kullanmak istediğimizi başına $ koyarak veriyoruz sonra da değeri veriyoruz.Böyle vererek fiyatı 10'dan büyük 20'den küçük değerleri bulmuş oluyoruz.
		
	/*const courses = await Course
		.find({author: 'Mosh', isPublished: true})//Bu metod bir DocumentQuery objesi döndürür ve Promise gibidir. then metodu kullanılabilir.Buraya filter methodu vereibliriz. Bir obje ile property araması yapabiliriz.
		.limit(10) // Gelecek kayıt sayısını kısıtlayabiliriz.
		.sort({name : 1}) // ASC order 1, DESC order -1
		.select({name : 1, tags : 1}); // Bu select yapısıyla her dökümendaki yalnızca istediğimiz key değerlerinin gelmesini istersek onların değerini 1 olarak set ediyoruz. */
	console.log(courses);
}
//getCourses();
async function getLogicalCourses(){
	//Lojik Operatörler
	// or
	// and
	
	//Course sınıfının metodlarını kullanıyoruz.
	const courses = await Course 
		.find()
		.or([ {author : 'Mosh' } , { isPublished : true} ]) // Bu operatörleri bir fonksiyon olarak kullanıyoruz. İçeriğinde bir obje arrayi alır. Bunlar filtre objeleridir. Bu haliyle bize kayıtlarda author mosh olan veya ispublished true olan  dökümanları getirir.
		.limit(10)
		.sort({name : 1})
		.select({name:1, author: 1})
	console.log(courses);
}
//getLogicalCourses();
async function getRegexCourses(){
	
	const courses = await Course
		//Örnek olarak author kısmı Mosh ile başlayan kursları getirmesini regex ile istiyoruz.
		.find({ author : /^Mosh/}) // Buranın syntaxında tek slash kullanılır ve /pattern/ şeklinde tanımlanır. Regexte ^ demek bununla başlayan demektir.
		
		// Mosh ile başlayıp başka bir stringle biten regex için şöyle yazabiliriz.
		.find({ author : /Hamedani$/i }) // Burada yeni bir pattern belirtmek için yeni bir find kullandık. Sondaki dolar işaret bu stringin sonda olduğunu belirtiyor. Case sensitive olur default olarak. Case insensitive olmasını istiyorsak sonuna i ekleriz.
		
		//Contains için
		.find({ author : /.*Mosh.*/i}) // Böyle yazdığımızda en sonraki find'ı işletir.
		.limit(10)
		.sort({name : 1})
		.select({name : 1});
		
	console.log(courses);
	
}
//getRegexCourses();

//Eğer sadece döküman sayısını istersen o zaman select() fonksiyonundan sonra count() fonksiyonunu kullanabiliriz. Bu bize aradığımız query'de kaç döküman olduğunu gösterir.
async function getCoursesWithPage(){
	//Burada sayfa sayıları vs enpointten gelir ama şimdilik constant kullanıyoruz.
	const pageNumber = 2;
	const pageSize = 10;
	
	
	const courses = await Course
		.find({ author : 'Mosh', isPublished: true})
		.skip((pageNumber - 1) * pageSize)//Burada vereceğimiz değer kadar kaydın geçmesini sağlayacağız.
		.limit(pageSize)
		.sort({name : 1})
		.select({name: 1, author 1});
	console.log(courses);
	
}














