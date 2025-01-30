const contenedorPeliculas = document.getElementById('contenedor');
const listadoPeliculas = document.getElementById('peliculas');
const targetasPeliculas = document.getElementById('targetas');
const botonesFiltro = document.getElementById('filtro');
const botonOrdenarAnyo = document.getElementById('ordenar');
const desplegableGeneros = document.getElementById('genero');
const desplegablePegi = document.getElementById('pegi');
let ascendente = true;


function cargarPeliculas() {
    return fetch('peliculas.json')
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

function pintarPeliculas(peliculas) {
    listadoPeliculas.innerHTML = "";
    for (let i = 0; i < peliculas.length; i++) {
        const pelicula = peliculas[i];
        
        const div = document.createElement('div');
        div.classList.add('targeta');

        const imagen = document.createElement('img');
        imagen.src = pelicula.imagen;

        const titulo = document.createElement('p');
        titulo.innerHTML = `<p id=titulo>${pelicula.titulo}</p>`;
        
        const año = document.createElement('p');
        año.textContent = `Año: ${pelicula.año}`;
        
        const genero = document.createElement('p');
        genero.textContent = `Género: ${pelicula.genero}`;

        const pegi = document.createElement('p');
        pegi.textContent = `PEGI: ${pelicula.pegi}`;
        
        div.appendChild(imagen);
        div.appendChild(titulo);
        div.appendChild(año);
        div.appendChild(genero);
        div.appendChild(pegi);

        listadoPeliculas.appendChild(div);
    }
}

function crearFiltros() {
    botonesFiltro.innerHTML = "";
    cargarPeliculas().then(peliculas => {
        const generos = [...new Set(peliculas.map(pelicula => pelicula.genero))];

        for (let i = 0; i < generos.length; i++) {
            const genero = generos[i];
            
            const button = document.createElement('button');
            button.classList.add('filtro-button');

            button.textContent = genero;
            button.addEventListener('click', () => filtrarPeliculas(genero));

            botonesFiltro.appendChild(button);
        }
    });
}

function ordenarPeliculas() {
    cargarPeliculas().then(peliculas => {
        // Método burbuja
        for (let i = 0; i < peliculas.length - 1; i++) {
            for (let j = 0; j < peliculas.length - i - 1; j++) {
                const añoA = parseInt(peliculas[j].año);
                const añoB = parseInt(peliculas[j + 1].año);
                if (ascendente ? añoA > añoB : añoA < añoB) {
                    [peliculas[j], peliculas[j + 1]] = [peliculas[j + 1], peliculas[j]];
                }
            }
        }

        pintarPeliculas(peliculas);
        ascendente = !ascendente;
    });
}

function crearDesplegable() {
    cargarPeliculas().then(peliculas => {
        const generos = [...new Set(peliculas.map(pelicula => pelicula.genero))];
        desplegableGeneros.innerHTML = "";

        const optionTodos = document.createElement('option');
        optionTodos.value = "";
        optionTodos.textContent = "Todos los géneros";
        desplegableGeneros.appendChild(optionTodos);

        generos.forEach(genero => {
            const option = document.createElement('option');
            option.value = genero;
            option.textContent = genero;
            
            desplegableGeneros.appendChild(option);
        });

        desplegableGeneros.addEventListener('change', (event) => {
            const generoSeleccionado = event.target.value;
            if (generoSeleccionado === "") {
                inicializar(); // Mostrar todas las películas si se selecciona "Todos los géneros"
            } else {
                filtrarPeliculas(generoSeleccionado);
            }
        });
    });
}

function filtrarPeliculas(genero) {
    cargarPeliculas().then(peliculas => {
        const peliculasFiltradas = peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
        pintarPeliculas(peliculasFiltradas);
    });
}

function inicializar() {
    cargarPeliculas().then(peliculas => {
        pintarPeliculas(peliculas);
    });
}

function crearDesplegablePegi() {
    desplegablePegi.addEventListener('change', (event) => {
        const pegiSeleccionado = event.target.value;
        if (pegiSeleccionado === "") {
            inicializar(); // Mostrar todas las películas si se selecciona "Todos los PEGI"
        } else {
            filtrarPorPegi(pegiSeleccionado);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider ul");
    const slides = document.querySelectorAll(".slider li");
    const totalSlides = slides.length;
  
    let index = 0;
  
    function moveSlider() {
      index++;
      if (index >= totalSlides) {
        index = 0;
      }
      slider.style.transform = `translateX(-${index * 100}%)`;
    }
  
    // Cambiar cada 3 segundos
    setInterval(moveSlider, 3000);
  });
  


function filtrarPorPegi(pegi) {
    cargarPeliculas().then(peliculas => {
        const peliculasFiltradas = peliculas.filter(pelicula => pelicula.pegi === pegi);
        pintarPeliculas(peliculasFiltradas);
    });
}

document.addEventListener('DOMContentLoaded', crearDesplegablePegi);

document.addEventListener('DOMContentLoaded', crearDesplegable);
inicializar();
crearFiltros();