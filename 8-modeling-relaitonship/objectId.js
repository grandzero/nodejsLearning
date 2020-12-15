// ObjectID => 5fd3a29d6c7da337740d3a0f
//Bu id'nin her 2 karakteri bir 1 byte olur.
//Böylece 12 bytetan oluşan bir id elimizde olur

// 12 bytes
	// 4 bytes: Timestamp
	// 3 bytes: machine identifier
	// 2 bytes: process identifier
	// 3 bytes: counter
// Bu byteları kullanarak neredeyse unique id 

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 3 byte = 2 ^ 24 = 16M // Eğer aynı anda, aynı makinede aynı processde 16 milyonun üzerinde kayıt gerçekleşirse o zaman overflow olabilir ve ve tekrar aynı objectid oluşabilir. Counter ona göre artıyor.

// Driver -> MongoDB Bu id'ler driverlar tarafından oluşturulur. Mongoose mongodb driverı ile konuşur ve id'yi öyle oluşturur.

const mongoose = require('mongoose');
//Böylece bir unique id oluşturabiliriz.
const id = new mongoose.Types.ObjectID();
console.log(id);

//İlk 4 byte'ın bir timestamp olduğunu biliyorduk. Timestamp'i şu şekilde elde edebiliriz.
console.log(id.getTimeStamp());

//ObjectID validate etmek için de bir metodumuz var.
const isValid = mongoose.Types.ObjectID.isValid('1234');
console.log(isValid);