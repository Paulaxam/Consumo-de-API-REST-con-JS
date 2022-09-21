const APIURL = 'https://api.thedogapi.com/v1/images/search';
const imgNumber = 4;
const reloadBtn = document.querySelector('#refresh');
const favoritesBtn = document.querySelector('#star');
const favoritesSection = document.querySelector('.fav-img-container');
const mainSection = document.querySelector('.img-container');
const mainTitle = document.querySelector('h1');
const favTitle = document.querySelector('h2');


async function getDoggy(url,imgNumber) {
    const queryParam = (imgNumber) ? `?limit=${imgNumber}` : '';
    const response = await fetch(`${url}${queryParam}`);
    const dataJson = await response.json();
    console.log(dataJson);
    const imgContainer = document.querySelector('.img-container');
    if(imgNumber) {
        imgContainer.innerHTML = '';
        for(let i=0; i<imgNumber; i++) {
            let imgInnerHtml = `
            <div class="img-card">
                <img src="${dataJson[i].url}" alt="perrito aleatorio">
                <button class="favorite">
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                </button>
            </div>`
            imgContainer.innerHTML += imgInnerHtml;
        }
    } else {
        imgContainer.innerHTML = `
        <img src="${dataJson[0].url}" alt="perrito aleatorio">
        <button>
            <span class="material-symbols-outlined">
                favorite
            </span>
        </button>`
    }
   
};

function reload() {
    getDoggy(APIURL,imgNumber);
    showMain();

}

function showMain() {
    mainSection.classList.remove('hidden');
    mainTitle.classList.remove('hidden');
    
    favoritesSection.classList.add('hidden');
    favTitle.classList.add('hidden');
}

function toggleFavorites() {
    mainSection.classList.toggle('hidden');
    mainTitle.classList.toggle('hidden');
    
    favoritesSection.classList.toggle('hidden');
    favTitle.classList.toggle('hidden');
}

getDoggy(APIURL,imgNumber);

reloadBtn.addEventListener('click', reload);
favoritesBtn.addEventListener('click',toggleFavorites);


