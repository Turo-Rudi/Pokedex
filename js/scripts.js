//IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      gender: ['Male', 'Female'],
      type: ['Fire'],
    },

    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      gender: ['Male', 'Female'],
      type: ['Water'],
    },

    {
      name: 'Caterpie',
      height: 0.3,
      weight: 2.9,
      gender: ['Male', 'Female'],
      type: ['Bug'],
    },

    {
      name: 'Rattata',
      height: 0.3,
      weight: 3.5,
      gender: ['Male', 'Female'],
      type: ['Normal'],
    },

    {
      name: 'Weedle',
      height: 0.3,
      weight: 3.2,
      gender: ['Male', 'Female'],
      type: ['Bug', 'Poison'],
    },
  ];

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('button');
        // appended the button to li
    listItem.appendChild(button);
        // appended the button to ul
    pokemonList.appendChild(listItem);
        // EventListener for button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'weight' in pokemon &&
      'gender' in pokemon &&
      'type' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon not correct");
    }
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

//forEach() loop IIFE pokemonList -at least- names and height
//let pokemonList = pokemonRepository.getAll();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  //document.write('<h3>'+pokemonList.name+'</h3>' + ' [weight: ' + pokemonList.weight + '] ' + '<br>' + ' [height: ' + pokemonList.height + '] ');
});
