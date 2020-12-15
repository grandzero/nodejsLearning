const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());//json middleware kullanıyoruz.Artık posttaki json okuyabileceğiz
const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'}
];
//Express içinde tanımlı fonksiyonlar 
app.get('/', (req,res) => {
	res.send("Hello World");
});
app.get('/api/courses', (req,res) => {
	
	res.send(courses);
});
app.get('/api/posts/:year/:month', (req,res) => {
	//res.send(req.params); year ve month buradan okunur. req.params.year şeklinde
	res.send(req.query.sortBy);//?sortBy=asc gibi api sonuna eklenen query parametrelerini görmek için kullanılır.
	//Query parametreleri mecburi olmayan alanlarda kullanmak için vardır.
	
});
app.get('/api/courses/:id',(req,res)=>{
	let crs = courses.find(c=> c.id === parseInt(req.params.id));//Burada aldığımız req.params.id string olarak gelir. Bu yüzden bunu integera çeviriyoruz. Find fonksiyonu eşit olduğu yerdeki değeri bize döndürür.
	if(!crs){//Obje yoksa 404 döndüreceğiz
		return res.status(404).send('The Course was not found');
		
	}
	res.send(crs);
})
//Burada da POST metodunu kullanıyoruz.
app.post('/api/courses', (req, res) =>{
	//Bu kısım security amaçlı input validation için kullanılır
	/*if(!req.body.name || req.body.name.length < 3){
		//400 Bad Request
		res.status(400).send('Name is required min 3 characters');
		return;
	}*/
	//Bu tek tek kontrol için kullanılır. Ama bunun yerine kullanılabilecek güçlü bir npm input validation npm paketi mevcut
	//Paketin adı joi
	//Joi paketinin çalışması için bir şemaya ihtiyacı vardır. Öncelikle joi için bu şemayı tanımlarız.
	const schema = {
		name: Joi.string().min(3).required()
	}
	const result = Joi.validate(req.body, schema);
	console.log(result);
	if(result.error){ // Eğer bir hata oluşursa result objesinin error kısmına yazılır
		//400 Bad Request
		return res.status(400).send(result.error.details[0].message); // Böylece kütüphanenin ürettiği error mesajını doğrudan göndermiş oluyoruz.
		
	}
	
	
	
	const crs = {
		id: courses.length+1,
		name: req.body.name // Bu işlemi yapabilmemiz için json parse yapabiliyor olmamız gerekiyor. Bunun için de json kütüphanesine ihtiyacımız var. Yani app objemizin json kullanabiliyor olması gerekiyor. Bu doğrudan expressjs in içinde yok.
	};
	courses.push(crs);
	res.send(crs); // Burada eklendikten sonra bunu ekleyen kullanıcının id'yi bilmeye ihtiyacı olabilir. Bu yüzden doğrudan res döndürüyoruz.
});
//Bir kursu güncellemek için kullanacağımız PUT requesti şu şekilde kullanırız
app.put('/api/courses/:id', (req,res) => {
	//Kursu var mı diye kontrol ediyoruz. Yoksa 404 döndürüyoruz.
	let crs = courses.find(c=> c.id === parseInt(req.params.id));
	if(!crs){
		return res.status(404).send('The Course was not found');
		
	}
	
	//Inputları Joi ile validate et
	//Invalidse 400 döndür
	//const result = validateCourse(req.body);
	const { error } = validateCourse(req.body);//Object destructing yapıyoruz
	if(error){ 
		return res.status(400).send(error.details[0].message); 
		
	}
	//Kursu Güncelle
	//Güncellenmiş kursu döndür
	crs.name = req.body.name;
	res.send(crs);
	
});

//Bir kursu silmek için kullanacağımız DELETE metodu
app.delete('/api/courses/:id', (req,res) => {
	//Aranan kurs yoksa 404 döndürüyoruz
	let crs = courses.find(c=> c.id === parseInt(req.params.id));
	if(!crs){
		return res.status(404).send('The Course was not found');
		
	}
	//Silme işlemi
	const index = courses.indexOf(crs);
	courses.splice(index, 1);
	
	res.send(crs);
})

//Bu kodları hem put fonksiyonunda hem de post da kullandığımız için fonksiyon haline getirdik.
function validateCourse(course){
	const schema = {
		name: Joi.string().min(3).required()
	}
	return Joi.validate(course, schema);
}


/*
app.post()
app.put()
app.delete()
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening port ${PORT}`);
})