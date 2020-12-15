function log(req, res, next){
	console.log("Logging..");
	next(); // Eğer bu fonksiyonu çağırmazsak request askıda kalır.
}
module.exports = log;