/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH (async/await)
 */

let coleccionPokemon = [];

async function buscarPokemon() {
  const pokemonNombre = document.getElementById('pokemon-input').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNombre}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Pokémon no encontrado");
      document.getElementById('pokemon-data').innerHTML =
        "<p>Pokémon no encontrado</p>";
      return;
    }

    const data = await response.json();

    let tipos;
    if (data.types.length > 1) {
      tipos = "";
      data.types.forEach((tipo, index) => {
        if (index === 0) {
          tipos = tipo.type.name;
        } else {
          tipos += ", " + tipo.type.name;
        }
      });
    } else {
      tipos = data.types[0].type.name;
    }

    document.getElementById('result-section').classList.remove('hidden');

    document.getElementById('pokemon-data').innerHTML = `
      <h3>${data.name.toUpperCase()}</h3>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Tipo(s):</strong> ${tipos}</p>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <br>
      <button id="add-collection-btn">Agregar a la colección</button>
    `;

    document.getElementById('add-collection-btn').addEventListener('click', function () {
      agregarAColeccion(data.name, data.sprites.front_default);
    });

  } catch (error) {
    console.log("Error en la petición");
    console.error(error);
  }
}

document.getElementById('search-btn').addEventListener('click', buscarPokemon);



/**
 * Ejercicio 2: buscar pokemon con FETCH usando then/catch
 */

/*
function buscarPokemon() {
  const pokemonNombre = document.getElementById('pokemon-input').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNombre}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        console.log("Pokémon no encontrado");
        document.getElementById('pokemon-data').innerHTML =
          "<p>Pokémon no encontrado</p>";
        return;
      }
      return response.json();
    })
    .then(data => {
      if (!data) return;

      let tipos;
      if (data.types.length > 1) {
        tipos = "";
        data.types.forEach((tipo, index) => {
          if (index === 0) {
            tipos = tipo.type.name;
          } else {
            tipos += ", " + tipo.type.name;
          }
        });
      } else {
        tipos = data.types[0].type.name;
      }

      document.getElementById('result-section').classList.remove('hidden');

      document.getElementById('pokemon-data').innerHTML = `
        <h3>${data.name.toUpperCase()}</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Tipo(s):</strong> ${tipos}</p>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <br>
        <button id="add-collection-btn">Agregar a la colección</button>
      `;

      document.getElementById('add-collection-btn').addEventListener('click', function () {
        agregarAColeccion(data.name, data.sprites.front_default);
      });
    })
    .catch(error => {
      console.log("Error en la API");
      console.error(error);
    });
}

document.getElementById('search-btn').addEventListener('click', buscarPokemon);
*/



/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */

/*
function buscarPokemonJQueryAJAX() {
  const pokemonNombre = $('#pokemon-input').val().toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNombre}`;

  $.ajax({
    url: url,
    method: 'GET',
    success: function (data) {

      let tipos;
      if (data.types.length > 1) {
        tipos = "";
        data.types.forEach((tipo, index) => {
          if (index === 0) {
            tipos = tipo.type.name;
          } else {
            tipos += ", " + tipo.type.name;
          }
        });
      } else {
        tipos = data.types[0].type.name;
      }

      $('#result-section').removeClass('hidden');

      $('#pokemon-data').html(`
        <h3>${data.name.toUpperCase()}</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Tipo(s):</strong> ${tipos}</p>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <br>
        <button id="add-collection-btn">Agregar a la colección</button>
      `);

      $('#add-collection-btn').on('click', function () {
        agregarAColeccion(data.name, data.sprites.front_default);
      });
    },
    error: function () {
      console.log("Pokémon no encontrado");
      $('#pokemon-data').html("<p>Pokémon no encontrado</p>");
    }
  });
}

$(document).ready(function () {
  $('#search-btn').on('click', buscarPokemonJQueryAJAX);
});
*/



/**
 * Ejercicio 4: Crear una lista de Pokémon capturados
 */

function agregarAColeccion(nombre, imagen) {
  coleccionPokemon.push({
    nombre: nombre,
    imagen: imagen
  });

  console.log("Pokémon añadido a la colección:", nombre);
}

document.getElementById('view-collection-btn').addEventListener('click', mostrarColeccion);

function mostrarColeccion() {
  const contenedor = document.getElementById('collection-list');
  contenedor.innerHTML = "";

  if (coleccionPokemon.length === 0) {
    contenedor.innerHTML = "<p>No has capturado ningún Pokémon</p>";
    return;
  }

  coleccionPokemon.forEach(pokemon => {
    contenedor.innerHTML += `
      <div class="pokemon-card">
        <p>${pokemon.nombre.toUpperCase()}</p>
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      </div>
    `;
  });

  document.getElementById('collection-section').classList.remove('hidden');
}


/**
 * Ejercicio 5: Filtrar Pokémon por Tipo con Promesas
 */

document.getElementById('filter-btn').addEventListener('click', filtrarPorTipo);

function filtrarPorTipo() {
  const tipoNombre = document.getElementById('type-input').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/type/${tipoNombre}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        console.log("Tipo no encontrado");
        document.getElementById('pokemon-data').innerHTML =
          "<p>Tipo no encontrado</p>";
        return;
      }
      return response.json();
    })
    .then(data => {
      if (!data) return;

      //los primeros 5 solo illo q son tela
      const wewe = data.pokemon.slice(0, 5);

      // Creamos un array para obtener info de cada Pokémon
      const promesas = wewe.map(p => fetch(p.pokemon.url).then(r => r.json()));

      // Ejecutamos todas las promesas
      return Promise.all(promesas);
    })
    .then(pokemons => {
        if (!pokemons) return;

      // Mostramos los Pokémon en el mismo contenedor que el resultado
      let html = "<h3>Pokémon filtrados por tipo:</h3>";
      pokemons.forEach(p => {
        let tipos;
        if (p.types.length > 1) {
          tipos = "";
          p.types.forEach((tipo, index) => {
            if (index === 0) {
              tipos = tipo.type.name;
            } else {
              tipos += ", " + tipo.type.name;
            }
          });
        } else {
          tipos = p.types[0].type.name;
        }

        html += `
          <div class="pokemon-card">
            <h4>${p.name.toUpperCase()}</h4>
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Tipo(s):</strong> ${tipos}</p>
            <img src="${p.sprites.front_default}" alt="${p.name}">
          </div>
         <hr>
        `;
      });

      document.getElementById('pokemon-data').innerHTML = html;
      document.getElementById('result-section').classList.remove('hidden');
    })
    .catch(error => {
      console.log("Error al filtrar Pokémon por tipo");
      console.error(error);
      document.getElementById('pokemon-data').innerHTML =
        "<p>Error al filtrar Pokémon por tipo</p>";
    });
}
