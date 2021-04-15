//Create a new variable called pokemonList and assign to it a blank array. Add several objects to the array.
let pokemonList = [
  {
  //Charmander
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    gender: ['Male', 'Female'],
    type: ['Fire'],
  },

  {
  //Squirtle
    name: 'Squirtle',
    height: 0.5,
    weight: 9,
    gender: ['Male', 'Female'],
    type: ['Water'],
  },

  {
  //Caterpie
    name: 'Caterpie',
    height: 0.3,
    weight: 2.9,
    gender: ['Male', 'Female'],
    type: ['Bug'],
  },

  {
  //Rattata
    name: 'Rattata',
    height: 0.3,
    weight: 3.5,
    gender: ['Male', 'Female'],
    type: ['Normal'],
  },

  {
  //Weedle
    name: 'Weedle',
    height: 0.3,
    weight: 3.2,
    gender: ['Male', 'Female'],
    type: ['Bug', 'Poison'],
  },
];

//loop pokemonList names and height and display biggest
for (var i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.5) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + ' - That’s the biggest! '+'<br>');
  }else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') '+'<br>');
  }
};
