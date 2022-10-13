const MAIN_API_URL = "https://api.thedogapi.com/v1/images/search";
const API_KEY =
  "api_key=live_8BBQiEV6X2m3rBuivpQrHa6a60tulTSBCBb8QrtP8qo0S2kxplBlDLZbgVs0PN1a";
const X_API_KEY =
  "live_8BBQiEV6X2m3rBuivpQrHa6a60tulTSBCBb8QrtP8qo0S2kxplBlDLZbgVs0PN1a";
const FAVORITE_API = "https://api.thedogapi.com/v1/favourites";
const UPLOAD_API = "https://api.thedogapi.com/v1/images/upload";
const imgNumber = 4;

const homeBtn = document.querySelector("#home");
const reloadBtn = document.querySelector("#refresh");
const favoritesBtn = document.querySelector("#star");
const uploadBtn = document.querySelector("#upload");

const favoritesSection = document.querySelector(".fav-img-container");
const mainSection = document.querySelector(".img-container");
const uploadSection = document.querySelector(".uploading");

const mainTitle = document.querySelector("h1");
const favTitle = document.querySelector(".h2-fav");
const uploadTitle = document.querySelector(".h2-up");

const heartBtn = document.querySelector(".favorite");
const uploadDoggyBtn = document.querySelector("#upload-doggy");
const spanError = document.querySelector("#error");
const uploadInput = document.getElementById("file");
const pUpload = document.querySelector("p");

let imgLoaded = [];
let favImgSaved = [];

async function getDoggy(imgNumber) {
  const queryParam = imgNumber ? `&limit=${imgNumber}` : "";
  imgLoaded = [];
  try {
    const response = await fetch(`${MAIN_API_URL}?${API_KEY}${queryParam}`);
    const dataJson = await response.json();
    const imgContainer = document.querySelector(".img-container");
    if (imgNumber) {
      imgContainer.innerHTML = "";
      for (let i = 0; i < imgNumber; i++) {
        let imgInnerHtml = `
                <div class="img-card">
                    <img src="${dataJson[i].url}" alt="perrito aleatorio">
                    <button class="favorite">
                        <span class="material-symbols-outlined" id="fav-${
                          i + 1
                        }">
                            favorite
                        </span>
                    </button>
                </div>`;
        imgContainer.innerHTML += imgInnerHtml;
        imgLoaded.push(dataJson[i]);
      }
      console.log(imgLoaded);
    } else {
      imgContainer.innerHTML = `
            <img src="${dataJson[0].url}" alt="perrito aleatorio">
            <button>
                <span class="material-symbols-outlined" id="fav-1>
                    favorite
                </span>
            </button>`;
    }
  } catch (error) {
    spanError.innerHTML = error;
    mainSection.classList.add("hidden");
    favoritesBtn.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    spanError.classList.remove("hidden");
  }
}

async function loadFavoriteDoggies() {
  favImgSaved = [];
  try {
    const response = await fetch(`${FAVORITE_API}?${API_KEY}`);
    const data = await response.json();
    const numberOfFavorites = data.length;
    favoritesSection.innerHTML = "";
    for (let i = 0; i < numberOfFavorites; i++) {
      let imgInnerHtml = `
            <div class="img-card">
                <img src="${
                  data[i].image.url
                }" alt="perrito aleatorio favorito">
                <button class="favorite">
                    <span class="material-symbols-outlined" id="remove-fav-${
                      i + 1
                    }">
                    heart_minus
                    </span>
                </button>
            </div>`;
      favoritesSection.innerHTML += imgInnerHtml;
      favImgSaved.push(data[i]);
      console.log(`FavImgSaved`, favImgSaved);
    }
    console.log(data);
  } catch (error) {
    spanError.innerHTML = error;
    favoritesSection.classList.add("hidden");
    favoritesBtn.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    spanError.classList.remove("hidden");
  }
}

async function saveFavoriteDoggy(index) {
  try {
    let imageId = imgLoaded[index].id;
    const res = await fetch(`${FAVORITE_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
      body: JSON.stringify({
        image_id: imageId,
      }),
    });
    console.log(res);
  } catch (error) {
    spanError.innerHTML = error;
    mainSection.classList.add("hidden");
    favoritesBtn.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    spanError.classList.remove("hidden");
  }
}

async function deleteFavoriteDoggy(index) {
  let imageId = favImgSaved[index].id;
  try {
    const res = await fetch(`${FAVORITE_API}/${imageId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": X_API_KEY,
      },
    });
    const data = await res.json();
    console.log(data);
    loadFavoriteDoggies();
  } catch (error) {
    spanError.innerHTML = error;
    favoritesSection.classList.add("hidden");
    favoritesBtn.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    spanError.classList.remove("hidden");
  }
}

function loadDoggies() {
  getDoggy(imgNumber);
  favoritesBtn.classList.remove("hidden");
  uploadBtn.classList.remove("hidden");
  showMain();
}

function showMain() {
  spanError.classList.add("hidden");

  mainSection.classList.remove("hidden");
  mainTitle.classList.remove("hidden");

  favoritesSection.classList.add("hidden");
  favTitle.classList.add("hidden");

  uploadSection.classList.add("hidden");
  uploadTitle.classList.add("hidden");
}

function toggleFavorites() {
  spanError.classList.add("hidden");
  favoritesBtn.classList.remove("hidden");
  uploadBtn.classList.remove("hidden");
  loadFavoriteDoggies();

  mainSection.classList.add("hidden");
  mainTitle.classList.add("hidden");

  favoritesSection.classList.remove("hidden");
  favTitle.classList.remove("hidden");

  uploadSection.classList.add("hidden");
  uploadTitle.classList.add("hidden");
}

function toggleUpload() {
  spanError.classList.add("hidden");
  favoritesBtn.classList.remove("hidden");
  uploadBtn.classList.remove("hidden");
  pUpload.classList.add("hidden");

  mainSection.classList.add("hidden");
  mainTitle.classList.add("hidden");

  favoritesSection.classList.add("hidden");
  favTitle.classList.add("hidden");

  uploadSection.classList.remove("hidden");
  uploadTitle.classList.remove("hidden");
}

function changeBtnColor(btnId) {
  const btn = document.getElementById(btnId);
  btn.classList.add("filled");
}

function saveImgToFav(e) {
  let btnId = e.target.id;
  let btnIdToArray = Array(...btnId);
  let index = Number(btnIdToArray.at(-1)) - 1;
  changeBtnColor(btnId);
  saveFavoriteDoggy(index);
}

function removeImgFromFav(e) {
  let btnId = e.target.id;
  let btnIdToArray = Array(...btnId);
  let index = Number(btnIdToArray.at(-1)) - 1;
  changeBtnColor(btnId);
  deleteFavoriteDoggy(index);
}

async function uploadDoggy() {
  const form = document.getElementById("uploading-form");
  const formData = new FormData(form);
  const loadImg = document.getElementById("upload-output");
  loadImg.classList.add("hidden");
  pUpload.classList.remove("hidden");
  pUpload.innerHTML = `Estamos subiendo tu perrito ⏳`;

  try {
    const res = await fetch(UPLOAD_API, {
      method: "POST",
      headers: {
        "X-API-KEY": X_API_KEY,
      },
      body: formData,
    });
    const data = await res.json();
    const res1 = await fetch(`${FAVORITE_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
      body: JSON.stringify({
        image_id: data.id,
      }),
    });
    console.log(data);
    if (data.approved === 1) {
      pUpload.innerHTML = `Ya subimos tu perrito!🥰`;
    }
  } catch (error) {
    spanError.innerHTML = `<p style="color:rgb(194, 3, 3)">ups!! algo salió mal</p><p style="color:rgb(194, 3, 3)">Segur@ que es perro?🤔</p>`;
    uploadSection.classList.add("hidden");
    favoritesBtn.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    spanError.classList.remove("hidden");
  }
}

function showFile() {
  const form = document.getElementById("uploading-form");
  const loadImg = document.getElementById("upload-output");
  const formData = new FormData(form);

  loadImg.classList.remove("hidden");
  pUpload.classList.add("hidden");

  loadImg.src = URL.createObjectURL(formData.get("file"));
  loadImg.classList.remove("hidden");

  if (!formData.get("file").name) {
    loadImg.classList.add("hidden");
  }
}

getDoggy(imgNumber);

reloadBtn.addEventListener("click", loadDoggies);
favoritesBtn.addEventListener("click", toggleFavorites);
mainSection.addEventListener("click", saveImgToFav);
favoritesSection.addEventListener("click", removeImgFromFav);
uploadBtn.addEventListener("click", toggleUpload);
homeBtn.addEventListener("click", showMain);
uploadInput.addEventListener("change", showFile);
uploadDoggyBtn.addEventListener("click", uploadDoggy);
