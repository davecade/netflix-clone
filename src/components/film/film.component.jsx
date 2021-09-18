import React from 'react'
import { connect } from 'react-redux'
import { getSelectedMovie, setBannerData } from '../../redux/film/film.actions'
import './film.styles.scss'

const Film = ({film, getSelectedMovie , categoryID, selectedMovie, setBannerData }) => {

    const handleClick = movie => {

        if(selectedMovie.title === movie.title) {
            getSelectedMovie({id: '', title: ''})
        } else {
            getSelectedMovie(movie)
            setBannerData(film)
        }
        
    }

    return (
        <div className="film__container" onClick={() => handleClick({title: film.title, id: categoryID})}>
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="" />
        </div>
    )
}


const mapStateToProps = state => ({
    selectedMovie: state.film.selectedMovie
})

const mapDispatchToProps = dispatch => ({
    getSelectedMovie: movie => dispatch(getSelectedMovie(movie)),
    setBannerData: film => dispatch(setBannerData(film))
})

export default connect(mapStateToProps, mapDispatchToProps)(Film);
