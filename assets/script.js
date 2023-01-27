const findMusic = function (keyword, index) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      console.log(element.data);
      for (let i = 0; i < index; i++) {
        {
          let cardContainerReference = document.getElementById("card-section");
          cardContainerReference.innerHTML =
            cardContainerReference.innerHTML +
            `<div class="col"> <div class="card" style="width: 18rem">
                <img src="${element.data[i].album.cover_medium}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${element.data[i].title}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              </div>`;
        }
      }
    });
};
findMusic("fleetwood mac", 26);

const btnReference = document.getElementById("btn");
const input = document.getElementById("input");
console.log(input);

btnReference.onclick =
  ("click",
  function () {
    console.log("ciao");
  });
