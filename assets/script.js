let cardContainerReference = document.getElementById("card-section");

const cards = function (cover, title, album) {
  cardContainerReference.innerHTML += `<div class="col my-3"> <div class="card" style="width: 18rem">
                <img src="${cover}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <h6>${album}</h6>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              </div>`;
};

const favouriteSong = function () {};

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

        cards(cover, songTitle, albumName);
      }
    });
};
findMusic("artic monkeys", 4);

const btnReference = document.getElementById("btn");
const input = document.getElementById("input");
console.log(input);

btnReference.addEventListener("click", function () {
  cardContainerReference.innerHTML = "";
  findMusic(input.value, 4);
});
