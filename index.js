const container = document.querySelector(".container");
const opening = document.querySelector(".opening");
// const form = document.querySelector("form");
// const input = document.querySelector("input");
let pokemons = [];
let li = document.querySelectorAll("li");
let gen = "";

async function allPokemons() {
  await fetch(`https://pokebuildapi.fr/api/v1/random/team/suggest`)
  .then((res) => res.json())
  .then((data) => (pokemons = data));
    
  // console.log(pokemons[0]);
  allPokemonsDisplay();
}

// allPokemons();

function allPokemonsDisplay() {
  container.innerHTML = pokemons[0]
  .map((pokemon) =>
  `            
  <div class="cards">
      <p class="id">${pokemon.id}</p>
      <img src="${pokemon.sprite}" class="sprite">          
    <img src="${pokemon.image}">
    <h1>${pokemon.name}</h1> 
    </div>
    `
  )
  .join("");
}

// $(".cards").click(function(){
//   $(".cards").removeClass("active");
//   $(this).addClass("active");
// });




  // console.log(fetch(pokemon.url).then((res) => res.json()).then((data) => (resume = data)))



// async function fetchShow(search) {
//         await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
//         .then((res) => res.json())
//         .then((data) => shows = data)

//         showsDislpay();
// };

// function showsDislpay() {
//         result.innerHTML = shows
//         // .filter((other) => other.show.name.toLowerCase().includes(input.value.toLowerCase()))
//         .map((other) =>
//              `
//                <div class="show">
//                 <img src='${other.show?.image?.medium || "../Assets/Images/images.png"}'>
//                    <div class="description">
//                        <h4>${other.show.name}</h4>
//                        <p>${other.show.summary}</p>
//                        <p>${other.show.status}</p>
//                    </div>
//                </div>
//                `
//         ).join("");
// };

// function debounce(callback, wait) {
//     let timerId;
//     return (...args) => {
//       clearTimeout(timerId);
//       timerId = setTimeout(() => {
//         callback(...args);
//       }, wait);
//     };
// }

// input.addEventListener('input', debounce(() => {
//     // console.log(input.value);
//     fetchShow(input.value);
//   }, 750))

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     // showsDislpay();
// });

window.addEventListener("load", () => {
    setTimeout(() => {
        opening.style.transform = "translateX(-100%)";
    }, 1500);
    setTimeout(() => {
        opening.remove();
    }, 3000);
    allPokemons();
  });


  async function generation() {
    await fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${gen}`)
    .then((res) => res.json())
    .then((data) => (pokemons = data));
      
    console.log(pokemons);
    genDisplay();
  }

  function genDisplay() {
    container.innerHTML = pokemons
    .map((pokemon) =>
    `            
    <div class="cards">
        <p class="id">${pokemon.id}</p>
        <img src="${pokemon.sprite}" class="sprite">          
      <img src="${pokemon.image}">
      <h1>${pokemon.name}</h1> 
      </div>
      `
    )
    .join("");
  }


  // gen1.addEventListener("click", () => {
  //   generation1();
  // });

  li.forEach(list => {
      list.addEventListener("click", (e) => {
        gen = e.target.id;
        generation();
      })
  });