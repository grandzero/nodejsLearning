console.log('Before');
//Şimdi burada öncelikle iç içe 3 async fonksiyon çağırmamız gerekiyor. Bu async fonksiyonları çalıştırmak ve o esnada akışı devam ettirmek için içinde settimeout olan fonksiyonlar hazırlıyoruz. Bunlar bizim async fonksiyonlarımız ama aldıkları datayla async iş yapmaları için birbirlerine bağlı olduklarını ve iç iç çalışmaları gerektiklerini düşünüyoruz. Bu yüzden bu async fonksiyonları iç içe çağırıp callback hell durumuna düşmemek için her async fonksiyonu çağıran ayrı bir fonksiyon yazıyoruz. Bu yazdığımız yeni fonksiyonlar bizim async fonksiyonlarımızı içindeki async diğer fonksiyonu çağıran wrapper fonksiyonu callback olarak vererek çağırıyoruz. Böylece her anonim fonksiyon aslında bir named function olmuş oluyor.


//With christmas tree problem
/*
const user = getUser(1, (user) => {
	console.log("User:" , user);
	getRepositories(user.githubUsername, (repos) => {
		console.log('Repos', repos);
		//getcommits yapmak istediğimizde yine iç içe  bir sürü fonksiyon oluyor. Buna Callback hell veya christmas tree problem de deniyor.
		getCommits(repos,displayCommits);
	})
}); // Sonuçlar hazır olduğunda bu fonksiyon sonucu ekrana basacak.

*/
console.log('After');
//Async function for get user
function getUser(id, callback) {
	setTimeout(() => {
		console.log('Reading a user from database...');
		callback({id : id, githubUsername : "grandzero"})
		
}, 2000); 
	return 1;
}

//Async function for get commits
function getRepositories(username,callback){
	setTimeout(() => {
		console.log('Calling Github API ...');
		callback (['repo1', 'repo2', 'repo3']);
	}, 2000);
	
}
//Async function for get repos
function getCommits(repo, callback){
	setTimeout(() => {
		console.log("Retrieveing commits ...");
		callback(['first','second','third']);
	}, 2000)
}
//Bu iç içe geçme sorununu çözmek için anonim fonksiyonları named function yapıyoruz.
function displayCommits(commits){
	console.log(commits);
}
//After named function
const newUsers = getUser(1, getRepo);
function getRepo(data){
	console.log("New döngü");
	getRepositories(data.githubUsername, getComm);
}
function getComm(data){
	getCommits(data,displayCommits);
}



