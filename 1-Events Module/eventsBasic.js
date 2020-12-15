//Buradaki tüm fonksiyonlar arrow function şeklinde yazılabilir.

const EventEmitter = require("events"); //Class names beginning UpperCase

const emitter = new EventEmitter();
//Emitting means signaling an event at application making noise

//Raise an listener
//Burada eklediğimiz event listener, uygulamada bu sinyal oluştuğunda bunu yakalar. Bu listener bağlamak için .on metodunu kullanıyoruz. Bu metodun birinci parametresi dinlemek istediğimiz event'ın adı ikinci parametresi ise sinyal yakalandığında çalıştırılacak signal handler fonksiyonu.
emitter.on("messageLogged", function(arg) { //Burada kullanılan arg e olabilir veya herhangi bir isim olabilir.
	console.log("listener called", arg);
});

//Raise an event
//Örnek olarak burada eventımıza bir isim veriyoruz. İlerleyen zamanlarda her log işlemi yapıldığında bu sinyalin uygulamada yankılanmasını yani emit edilmesini sağlayacağız.	
emitter.emit('messageLogged', {id : 1, url : 'url'}); // Best practice : Birden fazla argüman gönderilecekse JSON olarak gönder.
//emitter.emit('messageLogged', 1, "url"); =>Verdiğimiz sonraki parametreler bu event ile taşınacak parametrelerdir. Yani event argumentstir. 

//Real world örneklerinde doğrudan EventEmitter ile işlemler yapılmaz genel olarak bir sınıf yazılır ve bu sınıf içinde gerekli bütün eventler gönderilir veya yakalanır.