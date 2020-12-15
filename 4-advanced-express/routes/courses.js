const express = require('express');
const router = express.Router();//Burada app kullanamıyoruz çünkü ayrı bir app oluşturmaya sebep oluyor. Bunun yerine router objesini kullanıyoruz. En altta da router objesini export ediyoruz.

const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'}
];



//indexjs de bu dosyaya gelen bütün isteklerin / ile başladığını söylediğimiz için artık / diye kontrol etmemize gerek kalmıyor.
//Bu yüzden bütün routelarda / => / olarak değiştirdik.
router.get('/', (req,res) => {
	
	res.send(courses);
});

router.get('/:id',(req,res)=>{
	let crs = courses.find(c=> c.id === parseInt(req.params.id));
	if(!crs){
		return res.status(404).send('The Course was not found');
		
	}
	res.send(crs);
})

router.post('/', (req, res) =>{

	const schema = {
		name: Joi.string().min(3).required()
	}
	const result = Joi.validate(req.body, schema);
	console.log(result);
	if(result.error){ 
		
		return res.status(400).send(result.error.details[0].message); 
		
	}
	
	
	
	const crs = {
		id: courses.length+1,
		name: req.body.name 
	};
	courses.push(crs);
	res.send(crs); 
});

router.put('/:id', (req,res) => {
	
	let crs = courses.find(c=> c.id === parseInt(req.params.id));
	if(!crs){
		return res.status(404).send('The Course was not found');
		
	}
	

	const { error } = validateCourse(req.body);
	if(error){ 
		return res.status(400).send(error.details[0].message); 
		
	}

	crs.name = req.body.name;
	res.send(crs);
	
});


router.delete('/:id', (req,res) => {
	
	let crs = courses.find(c=> c.id === parseInt(req.params.id));
	if(!crs){
		return res.status(404).send('The Course was not found');
		
	}

	const index = courses.indexOf(crs);
	courses.splice(index, 1);
	
	res.send(crs);
})


function validateCourse(course){
	const schema = {
		name: Joi.string().min(3).required()
	}
	return Joi.validate(course, schema);
}
module.exports = router;