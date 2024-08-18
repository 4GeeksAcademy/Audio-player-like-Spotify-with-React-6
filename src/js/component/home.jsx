import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
	//Declaracion de variables de estados para almacenar  la lista de canciones, el ID de la cancion actual, y para saber si una cancion se esta reproducciendo o no
	const [songs, setListSongs] = useState([]);
	const [currentSongId, setCurrentSongId] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);

	//Declaramos el espacio de memoria donde usamos el useRef
	//useRef se utiliza para acceder directamente al elemento de audio en el DOM
	const audioElement = useRef(null);
	console.log(audioElement);



	//Funcion para obtener la lista de canciones desde la API
	const getListSongs = () => {
		fetch("https://playground.4geeks.com/sound/songs")
			.then((response) => response.json())//convierte la respuesta en JSON(formatea la data obtenida a un formato tipo objeto)
			.then((data) => {
				setListSongs(data.songs)//Almacena y actualiza la lista de canciones en su estado
			})

	}

	//Funcion para reproducir una cancion seleccionada donde se hizo el click
	// procesa la id de la cancion traida con el onclick
	//se activa un FOCO en la etiqueta audio accesada previamente con useRef
	const getUrlSong = (id) => {
		audioElement.current.src = "https://playground.4geeks.com" + songs[id - 1].url; // Configura la URL de la canción en el elemento de audio ojo id-1 por que los arrays empiezan desde posicion 0 que equivale a id =1 entonces para yo ubicarme en la cancion con id=1 tengo que restarle -1 
		audioElement.current.play();//Reproduce la cancion
		setCurrentSongId(id);//Actualiza el ID de la cancion actual
		setIsPlaying(true);//Marca que la cancion se esta reproduciendo
		// console.log(url);
	}

	//Funcion para pausar o reanuadar la reproduccion de la cancion actual
	const pausePlaySong = () => {
		// audioElement.current.pause();
		if (audioElement.current) {//Verifica si el elemento audio esta disponible y si es asi entra en el if anidado
			if (audioElement.current.paused) {//verifica si la cancion esta pausada
				audioElement.current.play();//reproduce la cancion
				setIsPlaying(true);//cambia el estado a se esta reproduciendo
			} else {
				audioElement.current.pause();//pausa la cancion
				setIsPlaying(false);//cambia el estado a pausado 
			}
		}
	}

	//Funcion para reproducir la cancion anterior
	const prevSong = () => {
		songs.forEach((item, index) => {
			if (currentSongId === item.id) {//encuentra la cancion actual en la lista
				if (index > 0) {//si no es la primera cancion
					//Reproduce la cancion anterior
					audioElement.current.src = "https://playground.4geeks.com" + songs[index - 1].url;//Asigna la URL de la cancion anterior
					console.log(audioElement.current)
					audioElement.current.play();//Reproduce la cancion
					setCurrentSongId(songs[index - 1].id);//actuliza el estado con el id de la cancion anterior
					setIsPlaying(true);//cambia el estado a se esta reproduciendo
				} else {
					console.log("se acabo")
				}
			}
		});
	};

	//Funcion para reproducir la siguiente cancion de la lista songs
	const nextSong = () => {
		songs.forEach((item, index) => {
			console.log(index);
			if (currentSongId === item.id) {// Encuentra la canción actual en la lista
				console.log(index);

				if (index + 1 < songs.length) {// Si no es la última canción
					//Reproduce la siguiente cancion
					audioElement.current.src = "https://playground.4geeks.com" + songs[index + 1].url;// Asigna la URL de la siguiente canción
					console.log(audioElement.current)
					audioElement.current.play();// Reproduce la canción
					setCurrentSongId(songs[index + 1].id);// Actualiza el estado con el ID de la siguiente canción
					console.log(songs[index + 1].id);
					setIsPlaying(true);//cambia el estado a se esta reproduciendo

				} else {
					console.log("se acabo")
				}
			}
		});
	}

	//Carga la lista de canciones obtenidas desde la API  al cargar el componente en el navegador
	useEffect(() => {
		getListSongs()// Llama a la función para obtener la lista de canciones
	}, [])

	return (
		<div className="bg-dark">
			<div className="text-left bg-dark">
				<h3 className="text-white">Lista de canciones </h3>
				<ol className="list-group ">
					{
						songs.map((item, index) => {
							return (
								<div key={index} >
									{/* Al hacer click en la cancion se captura id de la cancion y se ejecuta la funcion getUrlSOng  console.log(item.url) */}
									<li className={`text-white list-group-item d-flex text-center border-bottom ${currentSongId === item.id ? "bg-secondary" : "bg-black"} `} style={{ cursor: "pointer" }} key={item.id} onClick={() =>
										getUrlSong(item.id)
									}><span style={{ width: "3rem" }} className="fs-4"> {item.id} </span> <span className="fs-4">{item.name}</span> </li>
								</div>
							)
						})
					}
				</ol>
				<audio ref={audioElement}>
				</audio>
			</div>
			<div className="sticky-bottom bg-dark text-center p-2 d-flex justify-content-evenly">
				<button className="rounded border-0" onClick={() => prevSong()}><i className="fa fa-backward fs-3"></i></button>
				<button className="rounded border-0 p-1" onClick={() => pausePlaySong()}>{isPlaying ? <i className="fa fa-pause fs-2"></i> : <i className="fa fa-play fs-2"></i>}</button>
				<button className="rounded border-0" onClick={() => nextSong()}><i className="fa fa-forward fs-3"></i></button>
			</div>
		</div>
	);
};

export default Home;
