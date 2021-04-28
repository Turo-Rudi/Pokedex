//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let button = document.createElement('button');
  let modalContainer = document.querySelector('#modal-container');

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = capitalize(pokemon.name);
    button.classList.add('button');
        // appended the button to li
    listItem.appendChild(button);
        // appended the button to ul
    pokemonList.appendChild(listItem);
        // EventListener for button
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

//Get name, image, height, weight, type, abilities of pokemon
    let nameElement = document.createElement('h1');
    nameElement.innerText = capitalize(pokemon.name);
    let imageFrontElement = document.createElement('img');
    imageFrontElement.setAttribute('src', pokemon.imageUrlFront);
    let imageBackElement = document.createElement('img');
    imageBackElement.setAttribute('src', pokemon.imageUrlBack);
    let heightElement = document.createElement('p');
    heightElement.innerHTML = '<strong>Height: </strong>' + pokemon.height;
    let weightElement = document.createElement('p');
    weightElement.innerHTML = '<strong>Weight: </strong>' + pokemon.weight;
    let typesElement = document.createElement('p');
    typesElement.innerHTML = '<strong>Type: </strong>' + pokemon.types;
    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerHTML = '<strong>Abilities: </strong>' + pokemon.abilities;

    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageFrontElement);
    modal.append(imageBackElement);
    modal.append(heightElement);
    modal.append(weightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  button.addEventListener('click', () => {
    showModal(pokemon);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon not correct");
    }
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(" "+details.types[i].type.name);
        };
      item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(" "+details.abilities[i].ability.name);
        };
    }).catch(function (e) {
      console.error(e);
    });
  }

// function to capitalize first letter
  function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

//forEach() loop IIFE pokemonList -at least- names and height
//let pokemonList = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
  //document.write('<h3>'+pokemonList.name+'</h3>' + ' [weight: ' + pokemonList.weight + '] ' + '<br>' + ' [height: ' + pokemonList.height + '] ');
