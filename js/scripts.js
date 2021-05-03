//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//  let button = document.createElement('button');
//  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
//    listItem.classList.add('list-group-item', 'list-group-item-action');

    let button = document.createElement('button');
    button.innerText = capitalize(pokemon.name);
    button.classList.add('button');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');
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
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');

      modalTitle.empty();
      modalBody.empty();

  //Get name, image, height, weight, type, abilities of pokemon
      let nameElement = document.createElement('h1');
      nameElement.innerText = capitalize(pokemon.name);
      let imageFrontElement = document.createElement('img');
      imageFrontElement.setAttribute('src', pokemon.imageUrlFront);
      let imageBackElement = document.createElement('img');
      imageBackElement.setAttribute('src', pokemon.imageUrlBack);
      let heightElement = document.createElement('p');
      heightElement.innerHTML = '<strong>Height: </strong>' + pokemon.height + ' m';
      let weightElement = document.createElement('p');
      weightElement.innerHTML = '<strong>Weight: </strong>' + pokemon.weight + ' kg';
      let typesElement = document.createElement('p');
      typesElement.innerHTML = '<strong>Type: </strong>' + pokemon.types;
      let abilitiesElement = document.createElement('p');
      abilitiesElement.innerHTML = '<strong>Abilities: </strong>' + pokemon.abilities;

      modalTitle.append(nameElement);
      modalBody.append(imageFrontElement);
      modalBody.append(imageBackElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
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

/*  function showModal(pokemon) {

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
  });*/

// function to capitalize first letter
  function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
    //hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
