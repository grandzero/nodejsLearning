const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true, useNewUrlParser: true  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:[authorSchema]
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId){
  //let ObjectID = mongoose.ObjectID;
  //const course = await Course.findById(courseId);
  const course = await Course.update({ _id: courseId }, {
    $set: { // Burayı unset yaparak istediğimiz sub dökümanı da değiştirebiliriz.
       'author.name': ''
    }
  })
  console.log(course);
  try{
  //course.author.name = "Bayram Utku";
  //course.save() // Burada course.author.save şeklinde bir kullanım yapamıyoruz. Her zaman parent ile yapabiliriz eğer embeding document yaptıysak.
  }catch(e){
    console.log("ERROR: ", e);
  }
}
async function addAuthor(courseId, author){
  try{
    const course = await Course.findById(courseId);
    course.author.push(author);
    course.save();
  }catch(e){
    console.log("Error : ",e);
  }
}
async function removeAuthor(courseId, authorId){
  try{
    const course = await Course.findById(courseId);
    const author = course.author.id(authorId);
    author.remove();
    course.save();
  }catch(e){
    console.log(e);
  }
}
/*createCourse('Node Course', [
  new Author({ name: 'Bayram' }),
  new Author({ name: 'John' })
]);*/
//updateAuthor("5fd3279df1ff831a40a27939");
//addAuthor("5fd32eaa8e6f1528286e0652", new Author({name: 'Amy'}));
removeAuthor("5fd32eaa8e6f1528286e0652", "5fd3305762bf2622a4326026");
