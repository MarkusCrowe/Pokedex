const container = document.querySelector(".container");
const opening = document.querySelector(".opening");
let pokemons = [];
const form = document.querySelector("form");
const input = document.querySelector("input");
let li = document.querySelectorAll("li");
let gen = "";

async function aleaPokemons() {
  await fetch(`https://pokebuildapi.fr/api/v1/random/team/suggest`)
    .then((res) => res.json())
    .then((data) => (pokemons = data));

  aleaPokemonsDisplay();
  let cards = document.querySelectorAll(".cards");
  console.log(cards);
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      console.log(e.target.id);
      fetchPokemon(e.target.id);
    })
});

}

function aleaPokemonsDisplay() {
  container.innerHTML = pokemons[0]
    .map((pokemon) =>
      `            
  <div class="cards" id="${pokemon.id}">
      <p class="id">${pokemon.id}</p>
      <img src="${pokemon.sprite}" class="sprite">          
    <img src="${pokemon.image}" id="${pokemon.id}">
    <h1 class="name">${pokemon.name}</h1> 
    </div>
    `
    )
    .join("");
};

window.addEventListener("load", () => {
  setTimeout(() => {
    opening.style.transform = "translateX(-100%)";
  }, 1500);
  setTimeout(() => {
    opening.remove();
  }, 3000);
  aleaPokemons();
});

async function generation() {
  await fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${gen}`)
    .then((res) => res.json())
    .then((data) => (pokemons = data));

  genDisplay();
  let cards = document.querySelectorAll(".cards");
  console.log(cards);
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      console.log(e.target.id);
      fetchPokemon(e.target.id);
    })});
};

function genDisplay() {
  container.innerHTML = pokemons
    .map((pokemon) =>
      `            
    <div class="cards">
        <p class="id">${pokemon.id}</p>
        <img src="${pokemon.sprite}" class="sprite">          
      <img src="${pokemon.image}" id="${pokemon.id}">
      <h1>${pokemon.name}</h1> 
      </div>
      `
    )
    .join("");
};

async function allPokemons() {
  await fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
    .then((res) => res.json())
    .then((data) => (pokemons = data));

  allPokemonsDisplay();

  let allCards = document.querySelectorAll(".all_cards");
  console.log(allCards);
  allCards.forEach(card => {
    card.addEventListener("click", (e) => {
      console.log(e.target.id);
      fetchPokemon(e.target.id);
    })});
};

function allPokemonsDisplay() {
  container.innerHTML = pokemons
    .map((pokemon) =>
      `            
  <div class="all_cards" id="${pokemon.id}">
      <p class="id" id="${pokemon.id}">${pokemon.id}</p>
      <img src="${pokemon.sprite}" class="sprite" id="${pokemon.id}">          
      <h1 id="${pokemon.id}">${pokemon.name}</h1> 
    </div>
    `
    )
    .join("");
};

li.forEach(list => {
  list.addEventListener("click", (e) => {
    if(e.target.id === "alea") {
      aleaPokemons();
    } else if(e.target.id === "all"){
      allPokemons();
    } else {
      gen = e.target.id;
      generation();
    }
    
  })
});

async function fetchPokemon(search) {
        await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${search}`)
        .then((res) => res.json())
        .then((data) => (pokemons = data))

        console.log(pokemons);
        searchPokemonDisplay();
};

function searchPokemonDisplay() {
  container.innerHTML = 
      `            
      <div class="resume">
        <p class="id">${pokemons.id}</p>
        <img src="${pokemons.sprite}" class="sprite">          
        <img src="${pokemons.image}">
        <h1 class="name">${pokemons.name}</h1> 
      </div>
      `
  };

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
};

input.addEventListener('input', debounce(() => {
    fetchPokemon(input.value);
  }, 750));

// let names = document.querySelectorAll(".name");
// document.querySelectorAll(".name").forEach(name => {
//     name.addEventListener("click", () => {
//       console.log("test");
//     })
// });
