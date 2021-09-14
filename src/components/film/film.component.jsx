import React from 'react'
import './film.styles.scss'

const Film = ({film}) => {
    return (
        <div className="film__container">
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="" />
        </div>
    )
}

export default Film;
