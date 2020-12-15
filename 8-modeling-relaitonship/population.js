const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, //Sadece modelde olan veriler db'ye kayıt edilir.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id')//Yukarıda tip olarak mongoose.Schema.Types.ObjectId vermiştik ve referans olarak da Author yazmıştık. Mongoose buradan o kısmın bir obje id'si olduğunu ve Author collectionundaki bir objenin id si olduğunu anlıyor.
    //.populate('category', 'name')//Bu şekilde multiple alanlar da kullanılabilir.
    .select('name author');// Bu şekilde yüklediğimizde sadece id alırız.Bu yüzden burada populate metodunu kullanıyoruz.
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '5fd25af75ce7d423d41af40d')

listCourses();