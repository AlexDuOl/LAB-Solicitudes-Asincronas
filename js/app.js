const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
});

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f0cfdb73921e48ec840aedb2c20a1292`);
    articleRequest.onload = addNews;
    articleRequestonerror = handleError;
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error');
}

function addNews() {
    const data =JSON.parse(this.responseText);
    for (let i = 0; (i < 5) && (i < data.response.docs.length); i++) {
        const article = data.response.docs[i];   
        const title = article.headline.main;
        const snippet = article.snippet;
    
       let li = document.createElement('li');
       li.className = 'articleClass';
       li.innerHTML = snippet;
    
       responseContainer.appendChild(li);            
    }  
}
