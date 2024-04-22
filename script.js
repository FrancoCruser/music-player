//En este proyecto busco detallar diferentes string y array methods

//empezaremos accediendo a los elements #playlist-songs #play #pause
//con nuestro getElementById()

const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

//Ahora #next #shuffle #previous

const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");
const previousButton = document.getElementById("previous");

//Ahora crearemos un array para almacenar todas las canciones

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// Ahora utilizaremos una API
/*Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas
y protocolos que permite a diferentes aplicaciones o sistemas comunicarse entre sí.
En otras palabras, es una interfaz que define cómo los componentes de software
deben interactuar.

Las APIs son utilizadas tanto por desarrolladores de software como por empresas 
que desean permitir que terceros accedan a ciertas funciones de sus sistemas 
de manera controlada y segura. Esto puede incluir el acceso a datos, 
servicios o funcionalidades específicas.*/

//Web Audio API te permite generar y procesar audio en aplicaciones web

const audio = new Audio();

//EL reproductor deberia llevar un registro de las canciones, de la cancion actual, y el tiempo de la cancion actual
//para hacer esto vamos a crear un objeto para almacenar esta informacion

let userData = { songs: [...allSongs], currentSong: null, songCurrentTime: 0 };

// SPREAD OPERATOR (...): el operador spread te permite copiar todos los elementos
// de un array en otro. Puede ser tambien usado para concatenar multiples arrays en 1

//ahora vamos a necesitar una forma de poner en el display las canciones en el User Interface
// vamos a crear una arrow function que haga esto
//y usaremos el methodo map para agregar nuevo html para cada cancion y asi poder
//mostrar el titulo, el artista, la duracion y un boton delete.
//el method map() es usado para iterar sobre un array y retornar uno nuevo
//es util para cuando queremos crear un nuevo array con valores de uno existente.

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
    <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})}">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg></button>
    </li>`;
    })
    .join(""); //estamos encadenando el methodo join a nuestro map

  //ahora nuestro siguiente paso es actualizar la playlist en nuestro HTML para
  //visualizar las canciones
  playlistSongs.innerHTML = songsHTML;
};

//callback function: es una funcion que es pasada a otra funcion como argumento
// join() METHOD:
//el method join() es usado para concatenar todos los elementos de un array en un simple string
//toma un parametro opcional, llamado separator, que es usado para separar cada elemento.

//ahora necesitamos llamar a la funcion renderSongs y pasarle como parametro
// userData?.songs para finalmente visualizar las canciones en el UI

// el (?.) nos ayuda a prevenir errores cuando accedemos a propiedades anidadas que
//pueden ser null o undefined

renderSongs(sortSongs());

//Vamos a crear una funcion para ordenar las canciones en orden alfabetico

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
};

//para ordenar alfabeticamente por titulo vamos a tener que pasar una callback funcion
// de comparacion en nuestro method sort()

//Ahora vamos a implementaar la funcionalidad de reproducir las canciones

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  audio.play();
};

// METHOD FIND()
// Devuelve el primer elemento en el array que completa las condiciones especififacadas
//en la funcion callback. Sino el method retorna undefined

//Ahora vamos a agregar la funcionalidad al boton de play
// asi vamos a reproducir la cancion actual cuando es clickeado

playButton.addEventListener("click", () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

//Ahora vamos a trabajar en el boton de pausa

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

pauseButton.addEventListener("click", pauseSong);

//antes de comenzar a trabajar en los botones de "siguiente" y "previo"
//Necesitamos obtener el index de cada cancion en la propiedad userData.songs
//para obtener el index de la concion actual podemos usar indexOf() method

// indexOF() array method retorna el primer index en el cual se puede encontrar un elemento
//dado en el array, o -1 si el elemento no esta presente

const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

//ahora vamos  a trabajar en los botones next & previous

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

nextButton.addEventListener("click", playNextSong);

//ahora el boton de previous

const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

previousButton.addEventListener("click", playPreviousSong);

//ahora vamos a crear una funcion que va a resaltar la cancion reproducida actualmente

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

//forEach() method
//El metodo forEach es usado para loop atravez de un array y performar una funcion
// en cada elemente del array. Por ejemplo, tenemos un array de numeros y queremos
//loguearlo en el console log

//Ahora vamos a display la cancion actual y su titulo

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

//Para hacer la aplicacion mas accesible es importante que el boton de play
// describa la cancion actual o la primer cancion de la playlist

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
};
