// Button e input
const btnReference = document.getElementById("btn");
const input = document.getElementById("input");

// Containers e elementi
const cardContainerReference = document.getElementById("card-section");
const favSongContainerReference = document.getElementById("favourite-song");
const carouselImgReference1 = document.getElementById("album-1");
const carouselImgReference2 = document.getElementById("album-2");

// Arrays
let rankingAlbum = [];

// Elementi html
const cardsElements = function (cover, title, album) {
  cardContainerReference.innerHTML += `<div class="col my-3"> <div class="card card-customize" style="width: 18rem">
                <img src="${cover}" class="card-img-top card-img-customize" alt="..." />
                <div class="card-body bg-dark card-body-customize">
                  <h5 class="card-title text-warning">${title}</h5>
                  <h6 class="album text-white">${album}</h6>
                  <p class="card-text text-white fw-light">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-black text-warning">Go somewhere</a>
                </div>
              </div>
              </div>`;
};

const favouriteSongElement = function (cover, title, album) {
  favSongContainerReference.innerHTML = `<div class="col-md-6 bg-dark">
        <img src="${cover}" class="img-fluid favourite-song-img" alt="..." />
   </div>
  <div class="col-md-6 bg-dark card-body-container">
    <div class="card-body">
      <h5 class="card-title text-warning my-3 text-center">${title}</h5>
      <h6 class="text-white fst-italic text-center">${album}</h6>
      <p class="card-text text-warning mt-5 p-3">
        This is a wider card with supporting text below as a
        natural lead-in to additional content. This content is a
        little bit longer.
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>`;
};

// Funzione per raccogliere dati dalle canzoni nell'array rankingAlbum
const gatheringSongData = function (songTitle, rank, albumName) {
  rankingAlbum.push({ songTitle: songTitle, rank: rank, albumName: albumName });
};

// Funzione cards
const findMusic = function (keyword, index) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      for (let i = 0; i < index; i++) {
        let cover = element.data[i].album.cover_medium;
        let songTitle = element.data[i].title;
        let albumName = element.data[i].album.title;

        gatheringSongData(songTitle, element.data[i].rank, albumName);

        cardsElements(cover, songTitle, albumName);
      }
      console.log("ciao", rankingAlbum);
    });
};
findMusic("artic monkeys", 4);

// Campo di ricerca
btnReference.addEventListener("click", function () {
  cardContainerReference.innerHTML = "";
  findMusic(input.value, 6);
});

// Funzione canzone preferita
const favSong = function (keyword) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      let cover = element.data[0].album.cover_big;
      let songTitle = element.data[0].title;
      let albumName = element.data[0].album.title;

      gatheringSongData(songTitle, element.data[0].rank, albumName);
      favouriteSongElement(cover, songTitle, albumName);
    });
};
favSong("Giorgio moroder");

// Carosello
const carousel = function (keyword, carouselReference, index) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      let carouselImg = element.data;
      console.log(carouselImg);
      carouselReference.src = carouselImg[index].album.cover_big;
    });
};
carousel("daft punk", carouselImgReference1, 15);
carousel("curtains", carouselImgReference2, 0);

console.log(rankingAlbum.length);

// rankingAlbum.sort((a, b) => {
//   if (a.rank < b.rank) {
//     console.log(a.rank);
//     return 1;
//   } else if (a.rank === b.rank) {
//     console.log(a.rank);
//     return 0;
//   }
//   console.log(a.rank);
//   return -1;
// });
favSong("Giorgio moroder");
console.log("sorted", rankingAlbum);
// const btnDati = document.getElementById("dati");
// btnDati.addEventListener("click", function () {
//   console.log(rankingAlbum);
// });

// ALERT

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const alert = (message, type) => {
  const wrapper = document.createElement("div");

  wrapper.innerHTML += [
    `<div class="alert alert-${type} alert-dismissible alert-body" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById("liveAlertBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    // ordino per rank
    rankingAlbum.sort((a, b) => {
      if (a.rank < b.rank) {
        console.log(a.rank);
        return 1;
      } else if (a.rank === b.rank) {
        console.log(a.rank);
        return 0;
      }
      console.log(a.rank);
      return -1;
    });
    for (let i = 0; i < rankingAlbum.length; i++) {
      alert(
        `${i + 1}) ${rankingAlbum[i].songTitle}, rank ${rankingAlbum[i].rank}`,
        "light"
      );
    }
  });
}

// MODAL

const btnCloseModalRef = document.querySelector(".close-modal-btn");
const btnOpenModalRef = document.querySelector(".open-modal-btn");
const modalBodyRef = document.querySelector(".song-modal");
const overlayRef = document.querySelector(".overlay");
const modalTextRef = document.querySelector(".modal-text");

const closeElements = function () {
  modalBodyRef.classList.add("hidden");
  overlayRef.classList.add("hidden");
};

btnOpenModalRef.addEventListener("click", function () {
  console.log("prova", rankingAlbum);
  modalBodyRef.classList.remove("hidden");
  overlayRef.classList.remove("hidden");
  modalTextRef.innerHTML = "";
  for (let i = 0; i < rankingAlbum.length; i++) {
    modalTextRef.innerHTML += `<p class="text-white"><span class="marked-text text-warning">${rankingAlbum[i].songTitle}</span>, dall'album <span class="marked-text text-warning">${rankingAlbum[i].albumName}</span></p>`;
  }
});

btnCloseModalRef.addEventListener("click", closeElements);
overlayRef.addEventListener("click", closeElements);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalBodyRef.classList.contains("hidden"))
    closeElements();
});
