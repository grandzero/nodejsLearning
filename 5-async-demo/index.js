console.log('Before');
const user = getuser(1);//Burada kullanıcıyı alabilmek için beklememiz gerekiyor. Ama function çalışması bittiğinde burası çoktan işlendiği için hata alıyoruz. Bunun 3 çözümü var.
console.log(user);
console.log('After');

//Callbacks 
//Promises
//Async/Await
function getUser(id) {
	setTimeout(() => {
	console.log('Reading a user from database...');
	return {id : id, githubUsername : "grandzero"};
}, 2000); // 2000 saniye sonra belirlediğimiz fonksiyonu çalıştırır. Scheduling yapar. Bekleme yapmaz.Single thread çalışır. Multithread veya eşzamanlı çalışmaz. Sadece işlemi schedule eder.
	return 1;
}