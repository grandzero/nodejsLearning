//PARALLEL PROMISES 
const p1 = new Promise((resolve) => {
	setTimeout(()=> {
		console.log("Twitter API ...");
		resolve(1);
	}, 2000)
});
const p2 = new Promise((resolve) => {
	setTimeout(()=> {
		console.log("Facebook API ...");
		resolve(2);
	}, 2000)
});
// Bu şekilde arrayde verdiğimiz tüm promiseler bittiğinde bu promise sonuç döndürür.
Promise.all([p1,p2])
	.then(result => console.log(result));
/*
Output : 
Twitter API ...
Facebook API ...
[ 1 , 2 ]
*/
//Burada hala eşzamanlılık yok halen one threaded çalışıyoruz ama bir promise işini hallederken node diğerini de çalıştırıyor. Böylece ikisi de işini bitirince sonuçları bir array şeklinde alıyoruz. Arraydeki yerlerle argüman olarak verdiğimiz arraydeki yerler aynı.

//Burada da bir tanesi Rejected olursa ne oluyor ona göreceğiz
const p3 = new Promise((resolve,reject) => {
	setTimeout(()=> {
		console.log("Twitter API ...");
		reject(new Error('Twitter API rejected'));
	}, 2000)
});
const p4 = new Promise((resolve) => {
	setTimeout(()=> {
		console.log("Facebook API ...");
		resolve(2);
	}, 2000)
});
//Eğer argümanlardaki promiselerden bir tanesi rejected olursa bu son promise de rejected olur.
Promise.all([p3,p4])
	.then(result => console.log("Completed"))
	.catch(err => console.log(err.message));
	
//Herhangi bir işlem bittikten sonra birşeyler yapmak istiyorsak yani bir tanesi başarılı sonuçlandıktan sonra hemen sonucu işlemek istiyorsan race komutunu kullanıyoruz. Dönen sonuç da ilk dönen promise'in sonucu oluyor.
const p5 = new Promise((resolve) => {
	setTimeout(()=> {
		console.log("Instagram API ...");
		resolve(1);
	}, 2000)
});
const p6 = new Promise((resolve) => {
	setTimeout(()=> {
		console.log("Twitch API ...");
		resolve(2);
	}, 2000)
});

Promise.race([p5,p6])
	.then(result => console.log(result))
	.catch(err => console.log(err.message));