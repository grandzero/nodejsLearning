const EventEmitter = require("events"); //Class names beginning UpperCase
//const emitter = new EventEmitter();


 const Logger = require('./logger');
 const logger =  new Logger();
 
 //Export ettiğimiz loggerın EventEmitter objesi olduğunu extend ettiği için biliyoruz. Dolayısıyla bu obje üzerinde .on çağırabiliyoruz.
 logger.on("messageLogged", function(arg) { //Burada kullanılan arg e olabilir veya herhangi bir isim olabilir.
	console.log("listener called", arg);
});

 
 logger.log('message');
 //Bu şekilde çalıştırdığımızda logger.js ile buradaki eventemitter objeleri farklı olduğu için birbirlerini yakalayamaz
 //Yani her EventEmitter kendi objesi üzerinde tanımle eventlar üzerinde işlemler yapar.
 //Bu yüzden bunun yerine logger fonksiyonunu class haline getirip EventEmitterdan extend ediyoruz.