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

  function getAll() {
    return pokemonList;
    }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
    pokemonList.push(pokemon);
  }
  }

  return {
    getAll: getAll,
    add: add
  };
})();

//forEach() loop IIFE pokemonList -at least- names and height
let pokemonList = pokemonRepository.getAll();

pokemonRepository.getAll().forEach(function(pokemonList) {
  document.write('<h3>'+pokemonList.name+'</h3>' + ' [weight: ' + pokemonList.weight + '] ' + '<br>' + ' [height: ' + pokemonList.height + '] ');
});
