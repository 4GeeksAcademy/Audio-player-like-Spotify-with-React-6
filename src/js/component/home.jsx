import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
	const [songs, setSongs] = useState([])

	const getSongs = () => {
		fetch("https://playground.4geeks.com/sound/songs")
			.then((response) => response.json())
			.then((data) => {
				setSongs(data.songs)
			})

	}






	useEffect(() => {
		getSongs()
	}, [])

	return (
		<div className="text-center">
			<h3 className="text-white">Lista de canciones </h3>
			<ol>
				{
					songs.map((item, index) => {
						return (
							<div key={index} >
								<li className="text-white" key={item.name} onClick={}>{item.name}</li>
							</div>
						)
					})
				}
			</ol>
			<audio>
				<source src="horse.ogg" type="audio/ogg"/>
				<source src="horse.mp3" type="audio/mpeg" />
			</audio>
			<button>Play</button>

		</div>
	);
};

export default Home;
