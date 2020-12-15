//Promise bir async operasyonun sonucunu göstereceğini söyleyen bir sözdür(promise verir.)
//Promise için 3 state vardır : 
//Başlangıç state : Pending
//Fulfilled
//Rejected
// Pending ==> Fulfilled or Rejected

const p = new Promise((resolve,reject)=>{
	//ASYNC operation here
	//Operasyondan sonra bir değer gerçekleşir.
	setTimeout(() => {
		//resolve(1);
		reject(new Error('Error Message'));
	}, 2000);
	//resolve(1);//işlem başarılıysa örnek olarak db'den gelen objeyi kullanabiliriz.
	//reject(new Error('Error Message'));//İşlem başarılıysa
});

p
.then(result => console.log('Result', result))
.catch(err=> console.log("Error", err.message));

//Şimdi de callback ile yaptıklarımızı promise versiyonuna dönüştürelim
function getUser(id) {
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
		console.log('Reading a user from database...');
		resolve({id : id, githubUsername : "grandzero"})
		
	}, 2000); 
	});

	return 1;
}

//Promise function for get commits
function getRepositories(username){
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
		console.log('Calling Github API ...');
		resolve (['repo1', 'repo2', 'repo3']);
	}, 2000);
	});

	
}
//Promise function for get repos
function getCommits(repo){
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			console.log("Retrieveing commits ...");
			resolve(['first','second','third']);
	}, 2000)
	});
}
function displayCommits(commits){
	console.log(commits);
}
//After named function
//then fonksiyonu bu şekilde chain yapılabilir.
//Her then bir öncekinin resolve ettiği değeri içinde parametre olarak alır.
//then resolve edilen değeri bir promise ile wrap eder.
const newUsers = getUser(1).
then(result => getRepositories(result)).
then(result => getCommits(result)).
then(result => displayCommits(result)).
catch(err => console.log("This error will trigger if any then rejects"));
/*
//Promise API
//Unit testler için already resolved bir promise oluşturmak isteyebiliriz. Bunun için : 
const pr = Promise.resolve({id : 1});
p.then(result => console.log(result));
//doğrudan reject için 
const r = Promise.reject(new Error("Error found "));
p.catch(result => console.log(result.message));
*/



