const EventEmitter = require("events"); 
//const emitter = new EventEmitter();

var url = "http://mylogger.com/log";
//Classı EventEmitter dan türeterek bu sınıfın sahip olduğu bütün özellikelere sahip oluyoruz.
class Logger extends EventEmitter{
	log(message){
		console.log(message);
		this.emit('messageLogged', {id : 1, url : 'url'});//burada emitter yerine this diyoruz çünkü artık biz de emitter objesiyiz.
	}
}
module.exports = Logger;
