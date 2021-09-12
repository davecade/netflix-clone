import React, { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component'

function App() {
  const [ banner, setBanner ] = useState("")
  const [ rand, setRand ] = useState(2)

  useEffect(() => {
    (async () => {
        const newNum = Math.floor(Math.random() * 958)
        setRand(newNum)
        let data = await fetch(`https://api.themoviedb.org/3/movie/${newNum}?api_key=08aabbbef104512bb5432031efeae18c&language=en-US`)
        let converted = await data.json()
        setBanner(`https://image.tmdb.org/t/p/original${converted.backdrop_path}`)
        console.log(converted)
    })()
}, [])

  return (
    <div className="App">
      <Navbar />
      <div className="banner__container">
        <img className="banner__image" alt="banner" src={banner}></img>
      </div>
      {/* <h1 style={{color: "white"}}>{rand}</h1> */}
    </div>
  );
}

export default App;


//-- API Key: 08aabbbef104512bb5432031efeae18c