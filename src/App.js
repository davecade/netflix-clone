import React, { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component'

function App() {
  const [ banner, setBanner ] = useState("")
  const [ rand, setRand ] = useState(2)

  useEffect(() => {
    (async () => {
        const newNum = Math.floor(Math.random() * 20)
        setRand(newNum)
        // let data = await fetch(`https://api.themoviedb.org/3/movie/${newNum}?api_key=08aabbbef104512bb5432031efeae18c&language=en-US`)
        // let converted = await data.json()
        //setBanner(`https://image.tmdb.org/t/p/original${converted.poster_path}`)
        
        let secondData = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=08aabbbef104512bb5432031efeae18c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate')
        let secondConverted = await secondData.json()
        setBanner(`https://image.tmdb.org/t/p/original${secondConverted.results[newNum].poster_path}`)
        let id = secondConverted.results[newNum].id
        console.log("ID", id)
        let images = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=08aabbbef104512bb5432031efeae18c&language=en-US`)
        let convertedImages = await images.json()
        console.log("secondConverted", secondConverted)
        console.log("images", convertedImages)
        let fetchCompaone = await fetch(`https://api.themoviedb.org/3/search/company?api_key=08aabbbef104512bb5432031efeae18c&query=netflix&page=1`)
        let companies = await fetchCompaone.json()
        console.log("companies", companies.results[0].id)
        let fetchNetworks = await fetch(`https://api.themoviedb.org/3/network/213?api_key=08aabbbef104512bb5432031efeae18c`)
        let networks = await fetchNetworks.json()
        console.log("networks", networks)
      })()
}, [])

  return (
    <div className="App">
      <Navbar />
      <div className="banner__container">
        <img className="banner__image" alt="banner" src={banner} style={{
          width: "100vw"
        }}></img>
      </div>
      {/* <h1 style={{color: "white"}}>{rand}</h1> */}
    </div>
  );
}

export default App;


//-- API Key: 08aabbbef104512bb5432031efeae18c
//-- https://api.themoviedb.org/3/discover/movie?api_key=08aabbbef104512bb5432031efeae18c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate