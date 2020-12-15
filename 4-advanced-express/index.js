const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet'); // Detayları için documentation bakılabilir
const morgan = require('morgan'); // Requestleri loglamak için kullanılır
const config = require('config'); //Config klasörü altında belli değerleri saklayıp kullanmak için vardır.

const courses = require('./routes/courses');
const home = require('./routes/home');

//Database bağlantısı için https://expressjs.com/en/guide/database-integration.html bu sayfadan integrationlara bakabiliriz. Örnek olarak mongo için mongoclient kullanıyoruz ve bununla bağlanıyoruz. Genel olarak bir driver yükleriz. Bunun objesini oluşturup bu api üzerinden db işlemlerini yaparız.

app.set('view engine', 'pug');//Bu ayarlarda required yapmamıza gerek yok. Bu şekilde doğrudan pug kullanmış oluyoruz.

app.set('views', './views')// Bütün templateleri views klasörünün altında koymamız gerekiyor. Buradan alabileceğiz istediğimiz templateleri.


//Sürekli bir yerlere console log yazıp onları siliyoruz. Onun yerine istediğimiz namespace'de çalışacak istediğimiz alanlarda kullanabileceğimiz farklı debugger objeleri tanımlayabiliriz. Böylece ortam değişkenlerinde nereyi aktif edersek orasının debug mesajlarını görürüz. Örnek ortam değişkeni DEBUG=app:* olursa app: ile başlayanların hepsi aktif olur veya DEBUG=app:startup,app:db verebiliriz. ya da sadece bir tanesini
//Ayrıca doğrudan set etmemiz de şart değil. Çalıştırırken DEBUG=app:db nodemon index.js şeklinde çalıştırarak o environment değişkeniyle çalışmasını sağlayabiliriz.
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
if(app.get('env') === 'development'){
	startUpDebugger("Startup Debugger started");
	dbDebugger("Started db debugger");
}


//Configuration işlemleri için npm rc veya npm config paketini kullanabiliriz.Aşağıdaki configlerdeki bilgiler production veya development olmasına göre değişecek. Development için development.json okunacak.
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//Ama bu config dosyalarında şifre,key vs olmamalı

console.log('Mail Password: ' + config.get('mail.password'));
//Passwordu doğrudan custom-environment-variable içine koymadık ama onun yerine passwordün tutulacağı ortam değişkeninin adını koyduk. Böylece eğer set etmişsek gidip oradan okuyacak.

console.log(`NODE_ENV = ${process.env.NODE_ENV}`); // Environment varible döndürür. Test,Demo veya Production gibi şeyler döndürür.
console.log(`app : ${app.get('env')}`);// Eğer process.env.NODE_ENV set edilmemişse bu develop döndürür
//Windowsta set NODE_ENV = production yazarak linuxta da export NODE_ENV=production veya development yazarak node environment değişkenini değiştirip akışı productiona uygun olacak şekilde değiştirebiliriz.


app.use(express.json());//json middleware kullanıyoruz.Artık posttaki json okuyabileceğiz
//Bu json pipeline'a katılır. Böylece gelen her request önce json() fonksiyonuna sonra route() callback'e ulaşır.
//Request ==> json() ==> route() ==> Response

app.use(express.urlencoded({extended: true}));//HTML formlarının body'si  key=value&key2=value2 şeklinde gelir. Bunları işleyebilmek için gelir. Böylece array gibi gelen form verilerini de işleyebiliriz.


app.use(express.static('public'));// Bu da statik içerik göstermek istediğimizde kullandığımız middlewaredır. Verdiğimiz parametre public kayıt edilecek klasör adıdır. Static content doğrudan ana path'ten /readme.txt şeklinde serve edilir. Klasörün adı koyulmaz.

//Headerları belirleyerek güvenliği arttırmak için helmet middleware kullanılır.
app.use(helmet());


//Bir diğer kullanışlı paket de morgan paketidir. HTTP isteklerini loglamada kullanılır. Hem konsola hem de bir dosyaya yazmak için ayarlanabilir.
if(app.get('env') === 'development'){
	app.use(morgan('tiny'));
	console.log('Morgan Enabled');
}
//Şimdi kendi middleware fonksiyonumuzu oluşturacağız
//Middleware fonksiyonlarımız için best practice, herbirisini ayrı bir js dosyasında tutup require ile eklemektir.
app.use(logger);
app.use(function(req, res, next){
	console.log("Authenticating");
	next(); // Eğer bu fonksiyonu çağırmazsak request askıda kalır.
});
//Bu middleware  fonksiyonları sırayla çağırılır. Önce json sonra logging sonra da authenticating fonksiyonları çağrılır.

app.use('/api/courses', courses); // Nodejs'e bu route ile başlayan her dosyayla bu obje ilgilenecek diyoruz.

app.use('/', home);


//Her app.get gibi fonksiyonun içindeki callback fonksiyonlar aslında birer middleware'dır. Gelenr requesti işleyip response döndüren fonksyionlara denir.


app.get('/api/posts/:year/:month', (req,res) => {
	
	res.send(req.query.sortBy);
	
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening port ${PORT}`);
})