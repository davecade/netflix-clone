import React from 'react'
import { connect } from 'react-redux'
import { getSelectedMovie } from '../../redux/film/film.actions'
import './film.styles.scss'

const Film = ({film, getSelectedMovie , categoryID, selectedMovie }) => {

    const posterPath = `https://image.tmdb.org/t/p/original${film.poster_path}`

    const handleClick = movie => {

        if(selectedMovie.title === movie.title) {
            getSelectedMovie({id: '', title: '', movieID: ''})
        } else {
            getSelectedMovie(movie)
        }
        
    }

    return (
        <div className="film__container" onClick={() => handleClick({title: film.title, id: categoryID, movieID: film.id})}>
            <img src={posterPath ? posterPath : ''} alt="" />
        </div>
    )
}


const mapStateToProps = state => ({
    selectedMovie: state.film.selectedMovie
})

const mapDispatchToProps = dispatch => ({
    getSelectedMovie: movie => dispatch(getSelectedMovie(movie)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Film);
