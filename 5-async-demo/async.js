
function getUser(id) {
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
		console.log('Reading a user from database...');
		resolve({id : id, githubUsername : "grandzero"})
		
	}, 2000); 
	});

	return 1;
}


function getRepositories(username){
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
		console.log('Calling Github API ...');
		reject(new Error('Could not get repos ...'));
		//resolve (['repo1', 'repo2', 'repo3']);
	}, 2000);
	});

	
}

function getCommits(repo){
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			console.log("Retrieveing commits ...");
			resolve(['first','second','third']);
	}, 2000)
	});
}

/*
const newUsers = getUser(1).
then(result => getRepositories(result)).
then(result => getCommits(result)).
then(result => console.log(result)).
catch(err => console.log("This error will trigger if any then rejects"));
*/
//Async and Await Method
//Bu fonksiyon sayesinde asenkron kodları senkronmuş gibi yazabiliyoruz. Aslında burada bu async await promiseler üzerine kuruludur ve await'i yalnızca async fonksiyon içinde kullanabiliriz. Burada fonksiyon çağırıldığında await görür işlemi yapmaya başlar ve bırakır diğer işlemlere devam eder ve await ile belirtilen işlem tamamlanınca atamayı yapar ve devam eder.
async function displayCommits(){
	try { // Bu yaklaşımda bir .catch fonksiyonu kullanmamıza gerek yok bunun yerine try catch yapısını kullanabiliyoruz.
		const user = await getUser(1);
		const repos = await getRepositories(user.githubUsername);
		const commits = await getCommits(repos[0]);
		console.log(commits);
	}catch(err){
		console.log(err.message);
	}
}
displayCommits();//Bu bir promise döndürür

console.log('After');


