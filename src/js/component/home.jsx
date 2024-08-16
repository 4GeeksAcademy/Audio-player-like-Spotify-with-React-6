import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
	const [songs, setListSongs] = useState([])
	const [urlSong, setUrlSong] = useState("")
	const [currentSongId, setCurrentSongId] = useState("")


	//Obtener la lista de canciones
	const getSongs = () => {
		fetch("https://playground.4geeks.com/sound/songs")
			.then((response) => response.json())
			.then((data) => {
				setListSongs(data.songs)
			})

	}
	//Declaramos el espacio de memoria donde usamos el useRef
	const audioElement = useRef();
	console.log(audioElement);

	// procesa la url de la cancion traida con el onclick
	//se activa un FOCO en la etiqueta audio accesada previamente con useRef
	const playSong = (url) => {
		audioElement.current.src = "https://playground.4geeks.com" + url;
		audioElement.current.play();
		console.log(url);
	}

	//Funcion para reproducir la cancion anterior usando id
	const prevSong = (id) => {


	}

	//Funcion para reproducir la siguiente cancion usando id
	const nextSong = () => {

	}

	//Hacer que aparezcan las lista de canciones obtenidas desde la API  al cargar el componente en el navegador
	useEffect(() => {
		getSongs()
	}, [])

	return (
		<div className="text-center">
			<h3 className="text-white">Lista de canciones </h3>
			<ol className="list-group list-group-numbered bg-dark">
				{
					songs.map((item, index) => {
						return (
							<div key={index} >
								{/* Al hacer click en la cancion se captura la url de la cancion y se ejecuta la funcion PlaySOng  console.log(item.url) */}
								<li className="text-white list-group-item bg-dark" key={item.name} onClick={() => {
									playSong(item.url),
										setCurrentSongId(item.id);
								}}>{item.name} </li>
							</div>
						)
					})
				}
			</ol>
			<audio ref={audioElement}>

			</audio>

			<button onClick={() => prev(urlSong)}><i className="fa fa-backward"></i></button>
			<button onClick={() => playSong(urlSong)}><i className="fa fa-play"></i></button>
			<button onClick={() => nextSong(urlSong)}><i className="fa fa-forward"></i></button>


		</div>
	);
};

export default Home;
