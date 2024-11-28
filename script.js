function searchKey() {
  if (event.key === "Enter") {
    fetchPokemon();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextPokemon();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    prevPokemon();
  }
});

const PORT = 7000;

const currentID = 1;

async function init() {
  const initID = 25;

  try {
    const response = await fetch(`http://localhost:${PORT}/pokemon/${initID}`);

    if (!response.ok) {
      throw new Error(`Error fetching Pokemon: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    //! SETTING DATA IN HTML
    document.getElementById("pokemonInfo").style.display = "block";

    //! SETTING POKEMON NAME & ID
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = data.id;

    //! SETTING POKEMON IMAGE
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageBack").src = data.imageBack;
    document.getElementById("pokemonImageBack").alt = `Image of ${data.name}`;

    //! SETTING POKEMON IMAGE SHINY
    document.getElementById("pokemonImageShiny").src = data.imageShiny;
    document.getElementById("pokemonImageShiny").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageShinyBack").src = data.imageShinyBack;
    document.getElementById(
      "pokemonImageShinyBack"
    ).alt = `Image of ${data.name}`;

    //! SETTING POKEMON STATS
    document.getElementById("pokemonOrder").textContent = data.order;
    document.getElementById("pokemonTypes").textContent = data.types;
    document.getElementById("pokemonBaseExperience").textContent =
      data.base_experience;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonStats").textContent = data.stats;
    document.getElementById("pokemonHeldItems").textContent = data.held_items;
    document.getElementById("pokemonMoves").textContent = data.moves;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    document.getElementById("errorMessage").textContent =
      "Error fetching Pokemon. Please try again.";
    document.getElementById("errorMessage").style.display = "block";
  } finally {
    document.getElementById("loadingMessage").style.display = "none";
  }
}

init();

async function fetchPokemonList() {

  document.getElementById('listButton').onclick = null;

  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

  const pokemonListElement = document.getElementById ("pokemonList");

  for (let i = 1; i <= 1025; i++) {

    document.getElementById("listSection").style.display = "block";

    if (i == 1030) break;

    try {
        const response = await fetch (`http://localhost:${PORT}/pokemon/${i}`);
        if (!response.ok) throw new Error ("Erro ao buscar dados do Pokémon :(")

        const data = await response.json();


        //criação do card do Pokémon

        const pokemonCard = document.createElement ("div");
        pokemonCard.className = "pokemon-card";

        const pokemonImage = document.createElement ("img");
        pokemonImage.src = data.image;
        pokemonImage.alt = `Imagem de ${data.name}`;
        pokemonImage.className = "pokemon-image";

        const pokemonName = document.createElement ("h3");
        pokemonName.textContent = data.name.toUpperCase();
        
        const pokemonId = document.createElement("p");
        pokemonId.innerHTML = ` <button onclick="fetchPokemonId(${data.id})">ID: ${data.id}</button>`;

        //adiciona os elementos ao Card 
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonId);

        //adicona o card á lista 
        pokemonListElement.appendChild(pokemonCard);
    } catch (error) { 
        console.log ("Erro ao buscar dados do Pokémon:", error);
    }

    }
  }

async function fetchPokemon(currentID) {
  const pokemonName = document.getElementById("pokemonName").value.trim();

  if (!pokemonName) {
    document.getElementById("errorMessage").textContent =
      " PLEASE ENTER A POKEMON NAME OR ID";
    document.getElementById("errorMessage").style.display = "block";
  }

  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("loadingMessage").style.display = "block";

  try {
    const response = await fetch(
      `http://localhost:${PORT}/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("POKEMON NOT FOUND");
    }

    const data = await response.json();
    console.log(data);

    currentID = parseInt(data.id);

    //! SETTING DATA IN HTML
    document.getElementById("pokemonInfo").style.display = "block";

    //! SETTING POKEMON NAME & ID
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = data.id;

    //! SETTING POKEMON IMAGE
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageBack").src = data.imageBack;
    document.getElementById("pokemonImageBack").alt = `Image of ${data.name}`;

    //! SETTING POKEMON IMAGE SHINY
    document.getElementById("pokemonImageShiny").src = data.imageShiny;
    document.getElementById("pokemonImageShiny").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageShinyBack").src = data.imageShinyBack;
    document.getElementById(
      "pokemonImageShinyBack"
    ).alt = `Image of ${data.name}`;

    //! SETTING POKEMON STATS
    document.getElementById("pokemonOrder").textContent = data.order;
    document.getElementById("pokemonTypes").textContent = data.types;
    document.getElementById("pokemonBaseExperience").textContent =
      data.base_experience;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonStats").textContent = data.stats;
    document.getElementById("pokemonHeldItems").textContent = data.held_items;
    document.getElementById("pokemonMoves").textContent = data.moves;
  } catch (error) {
    document.getElementById("errorMessage").textContent = error.message;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("pokemonInfo").style.display = "none";
  } finally {
    document.getElementById("loadingMessage").style.display = "none";
  }

  return currentID;
}

async function fetchPokemonId(idVar, currentID) {

  window.scrollTo({top: 0, behavior: 'smooth'});

  currentID = idVar;

  try {
    const response = await fetch(`http://localhost:${PORT}/pokemon/${idVar}`);

    if (!response.ok) {
      throw new Error(`Error fetching Pokemon: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    //! SETTING DATA IN HTML
    document.getElementById("pokemonInfo").style.display = "block";

    //! SETTING POKEMON NAME & ID
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = data.id;

    //! SETTING POKEMON IMAGE
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageBack").src = data.imageBack;
    document.getElementById("pokemonImageBack").alt = `Image of ${data.name}`;

    //! SETTING POKEMON IMAGE SHINY
    document.getElementById("pokemonImageShiny").src = data.imageShiny;
    document.getElementById("pokemonImageShiny").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageShinyBack").src = data.imageShinyBack;
    document.getElementById(
      "pokemonImageShinyBack"
    ).alt = `Image of ${data.name}`;

    //! SETTING POKEMON STATS
    document.getElementById("pokemonOrder").textContent = data.order;
    document.getElementById("pokemonTypes").textContent = data.types;
    document.getElementById("pokemonBaseExperience").textContent =
      data.base_experience;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonStats").textContent = data.stats;
    document.getElementById("pokemonHeldItems").textContent = data.held_items;
    document.getElementById("pokemonMoves").textContent = data.moves;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    document.getElementById("errorMessage").textContent =
      "Error fetching Pokemon. Please try again.";
    document.getElementById("errorMessage").style.display = "block";
  } finally {
    document.getElementById("loadingMessage").style.display = "none";
  }
}

async function nextPokemon(currentID) {
  const nextID = parseInt(document.getElementById("pokemonId").textContent) + 1;

  currentID = nextID;

  try {
    const response = await fetch(`http://localhost:${PORT}/pokemon/${nextID}`);

    if (!response.ok) {
      throw new Error(`Error fetching Pokemon: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    //! SETTING DATA IN HTML
    document.getElementById("pokemonInfo").style.display = "block";

    //! SETTING POKEMON NAME & ID
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = data.id;

    //! SETTING POKEMON IMAGE
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageBack").src = data.imageBack;
    document.getElementById("pokemonImageBack").alt = `Image of ${data.name}`;

    //! SETTING POKEMON IMAGE SHINY
    document.getElementById("pokemonImageShiny").src = data.imageShiny;
    document.getElementById("pokemonImageShiny").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageShinyBack").src = data.imageShinyBack;
    document.getElementById(
      "pokemonImageShinyBack"
    ).alt = `Image of ${data.name}`;

    //! SETTING POKEMON STATS
    document.getElementById("pokemonOrder").textContent = data.order;
    document.getElementById("pokemonTypes").textContent = data.types;
    document.getElementById("pokemonBaseExperience").textContent =
      data.base_experience;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonStats").textContent = data.stats;
    document.getElementById("pokemonHeldItems").textContent = data.held_items;
    document.getElementById("pokemonMoves").textContent = data.moves;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    document.getElementById("errorMessage").textContent =
      "Error fetching Pokemon. Please try again.";
    document.getElementById("errorMessage").style.display = "block";
  } finally {
    document.getElementById("loadingMessage").style.display = "none";
  }
}

async function prevPokemon(currentID) {
  const nextID = parseInt(document.getElementById("pokemonId").textContent) - 1;

  currentID = nextID;

  try {
    const response = await fetch(`http://localhost:${PORT}/pokemon/${nextID}`);

    if (!response.ok) {
      throw new Error(`Error fetching Pokemon: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    //! SETTING DATA IN HTML
    document.getElementById("pokemonInfo").style.display = "block";

    //! SETTING POKEMON NAME & ID
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = data.id;

    //! SETTING POKEMON IMAGE
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageBack").src = data.imageBack;
    document.getElementById("pokemonImageBack").alt = `Image of ${data.name}`;

    //! SETTING POKEMON IMAGE SHINY
    document.getElementById("pokemonImageShiny").src = data.imageShiny;
    document.getElementById("pokemonImageShiny").alt = `Image of ${data.name}`;
    document.getElementById("pokemonImageShinyBack").src = data.imageShinyBack;
    document.getElementById(
      "pokemonImageShinyBack"
    ).alt = `Image of ${data.name}`;

    //! SETTING POKEMON STATS
    document.getElementById("pokemonOrder").textContent = data.order;
    document.getElementById("pokemonTypes").textContent = data.types;
    document.getElementById("pokemonBaseExperience").textContent =
      data.base_experience;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonStats").textContent = data.stats;
    document.getElementById("pokemonHeldItems").textContent = data.held_items;
    document.getElementById("pokemonMoves").textContent = data.moves;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    document.getElementById("errorMessage").textContent =
      "Error fetching Pokemon. Please try again.";
    document.getElementById("errorMessage").style.display = "block";
  } finally {
    document.getElementById("loadingMessage").style.display = "none";
  }
}

const imagens = document.querySelectorAll("#slider article");
let imagemAtual = 0;

function mostrarImagem(index) {
  imagens.forEach((img) => (img.style.display = "none"));
  imagens[index].style.display = "block";
}

function proximaImagem() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  mostrarImagem(imagemAtual);
}

mostrarImagem(imagemAtual);

const btnNext = document.getElementById("NextPic");

btnNext.addEventListener("click", () => {
  proximaImagem();
  if (imagemAtual === 0) {
    document.getElementById("NextPic").textContent = "View Shiny".toUpperCase();
  } else {
    document.getElementById("NextPic").textContent =
      "View Default".toUpperCase();
  }
});
