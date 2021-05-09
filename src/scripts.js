//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// function for push Pokemons
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon not correct');
    }
  }

// return pokemonList
  function getAll() {
    return pokemonList;
  }

// pokemonList and pokemonItem
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');

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
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

// fetch pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

// pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(' ' + details.types[i].type.name);
        }
        item.abilities = [];
        for (i = 0; i < details.abilities.length; i++) {
          item.abilities.push(' ' + details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

// display pokemons
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

// show modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //Get nme, image, height, weight, type, abilities of pokemon
    let nameElement = document.createElement('h1');
    nameElement.innerText = capitalize(pokemon.name);
    let imageFrontElement = document.createElement('img');
    imageFrontElement.setAttribute('src', pokemon.imageUrlFront);
    let imageBackElement = document.createElement('img');
    imageBackElement.setAttribute('src', pokemon.imageUrlBack);
    let heightElement = document.createElement('p');
    heightElement.innerHTML =
      '<strong>Height: </strong>' + pokemon.height + ' m';
    let weightElement = document.createElement('p');
    weightElement.innerHTML =
      '<strong>Weight: </strong>' + pokemon.weight + ' kg';
    let typesElement = document.createElement('p');
    typesElement.innerHTML = '<strong>Type: </strong>' + pokemon.types;
    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerHTML =
      '<strong>Abilities: </strong>' + pokemon.abilities;

    modalTitle.append(nameElement);
    modalBody.append(imageFrontElement);
    modalBody.append(imageBackElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // function to capitalize first letter
  function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// search pokemon
function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchBar');
  filter = input.value.toUpperCase();
  ul = document.getElementById('list-group');
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('button')[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
