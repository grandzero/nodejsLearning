//Birbiriyle ilişkili bilgiler kullanmak isteyebiliriz.

//Bunları kullanmak için 

//Normalization (Using References) -> CONSISTENCY burada birşey değiştirdiğimizde bu id'ye referansla ulaşan her yerde otomatik güncellenmiş olur.
let author = {
    name: 'Mosh'
}
let course = {
    author: 'id' // Db'de belirttiğimiz authorun idsini kullanabiliriz
    //Ama burada kullanacağımız id'lerle author tarafındaki id relational değildir. Node bunların ilişkili olup olmamasını önemsemez.
}

//Using Embeded Documents (Denormalization) -> Burada ise bir query ile istediğimize ulaşabiliriz. Query'den avantaj sağlar
let course = {
    author: {
        name:'Muş'
    }
}

//Burada bir tradeof söz konusu olur. Performansla tutarlılık(consistency) araında bir karar vermemiz gerekir.

//Bunlarla birlikte bir hybrid bir yaklaşım belirleyebiliriz.
let author = {
    name: 'mosh'
    //50 other properties
}

let course = {
    author: { // İhtiyacımız olan özellikleri burada tutuyoruz ve id ile de istediğimiz zaman erişebiliyoruz.
        id: 'refToDocument',
        name: 'Mosh'
    }
}
/*
let som = mongoose.Schema({
	name: {
		type: new mongoose.Schema({
			title: String,
			phone: {type: String, minlength: 7, maxlength: 16}
		}),
		required: true
	}
});
*/
//Referencing Documents
/*
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Mongo connection succesfull"))
    .catch(() => console.log("Db connection is not succesfull"));

const mgSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    category: String,
    price: Number
});

const schemaClass = mongoose.model('Course', mgSchema)
*/