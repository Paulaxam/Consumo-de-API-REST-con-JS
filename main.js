const MAIN_API_URL = 'https://api.thedogapi.com/v1/images/search?api_key=live_8BBQiEV6X2m3rBuivpQrHa6a60tulTSBCBb8QrtP8qo0S2kxplBlDLZbgVs0PN1a';
const FAVORITE_API = 'https://api.thedogapi.com/v1/favourites?api_key=live_8BBQiEV6X2m3rBuivpQrHa6a60tulTSBCBb8QrtP8qo0S2kxplBlDLZbgVs0PN1a';
const imgNumber = 4;
const reloadBtn = document.querySelector('#refresh');
const favoritesBtn = document.querySelector('#star');
const favoritesSection = document.querySelector('.fav-img-container');
const mainSection = document.querySelector('.img-container');
const mainTitle = document.querySelector('h1');
const favTitle = document.querySelector('h2');
const heartBtn = document.querySelector('.favorite');
const spanError = document.querySelector('#error');


async function getDoggy(url,imgNumber) {
    const queryParam = (imgNumber) ? `&limit=${imgNumber}` : '';
    try {
        const response = await fetch(`${url}${queryParam}`);
        const dataJson = await response.json();
        const imgContainer = document.querySelector('.img-container');
        if(imgNumber) {
            imgContainer.innerHTML = '';
            for(let i=0; i<imgNumber; i++) {
                let imgInnerHtml = `
                <div class="img-card">
                    <img src="${dataJson[i].url}" alt="perrito aleatorio">
                    <button class="favorite">
                        <span class="material-symbols-outlined" id="fav-${i+1}">
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
                <span class="material-symbols-outlined" id="fav-1>
                    favorite
                </span>
            </button>`
        }
    } catch (error) {
        spanError.innerHTML = error;
        mainSection.classList.add('hidden');
        spanError.classList.remove('hidden');  
    }
};

async function loadFavoriteDoggies(favUrl) {
    const response = await fetch(favUrl);
    const data = await response.json();
    console.log(data);

}

function loadDoggies() {
    getDoggy(MAIN_API_URL,imgNumber);
    showMain();

}

function showMain() {
    mainSection.classList.remove('hidden');
    mainTitle.classList.remove('hidden');
    
    favoritesSection.classList.add('hidden');
    favTitle.classList.add('hidden');
}

function toggleFavorites() {
    loadFavoriteDoggies(FAVORITE_API);
    mainSection.classList.toggle('hidden');
    mainTitle.classList.toggle('hidden');
    
    favoritesSection.classList.toggle('hidden');
    favTitle.classList.toggle('hidden');
}

function toogleImgToFav(e) {
    console.log(e.target);

}

getDoggy(MAIN_API_URL,imgNumber);

reloadBtn.addEventListener('click', loadDoggies);
favoritesBtn.addEventListener('click',toggleFavorites);
mainSection.addEventListener('click',toogleImgToFav);


