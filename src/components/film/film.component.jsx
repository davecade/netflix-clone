import React from 'react'
import { connect } from 'react-redux'
import { getSelectedMovie } from '../../redux/film/film.actions'
import './film.styles.scss'

const Film = ({film, getSelectedMovie , categoryID, selectedMovie }) => {

    const handleClick = movie => {

        if(selectedMovie.title === movie.title) {
            getSelectedMovie({id: '', title: '', movieID: ''})
        } else {
            console.log("SELECTED", selectedMovie)
            getSelectedMovie(movie)
        }
        
    }

    return (
        <div className="film__container" onClick={() => handleClick({title: film.title, id: categoryID, movieID: film.id})}>
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="" />
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
