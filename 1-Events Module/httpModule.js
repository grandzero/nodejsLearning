const http = require('http');
//Normal node bu şekilde çalışır ama api route'ları çoğaldıkça kod karmaşıklaşır
//Bunun önüne geçmek için express js kullanılır ve bu framework http modülü üzerine kurulmuştur.
const server = http.createServer((req,res) => {
		//Bu fonksiyonun içinde servera gelen isteğin içeriğini görüp res ile bir response döndürebiliriz.
		if(req.url === '/'){
			res.write("Hello World");
			res.end();
		}
		if(req.url === '/api/courses'){
			res.write(JSON.stringify([1,2,3,4]));
			res.end();
		}
	
}); //Bu oluşturulan server aslında bir event emitter objesidir. 
//.on .addEventListener .emit  gibi fonksiyonları barındırır.
//Eğer nodejs apisine bakarsak https://nodejs.org/api/index.html http sınıfının net.server dan inherit edildiğini görürürüz.
// O obje de eventemitterdan extend edilir ve belli eventlar tanımlıdır.
/*
//Bu eventemitter objesi olduğu için belli eventları dinleyebiliriz. Örnek olarak listen başlatmadan önce connection eventı için listener ekleyelim
server.on('connection',(socket) => {
	console.log("New Connection");
})
//Bu şekilde eklemek çok low level bir yaklaşımdır. Server ve apiyi bu şekilde yazmıyoruz.
*/
server.listen(3000);

console.log("listening port 3000 ...");