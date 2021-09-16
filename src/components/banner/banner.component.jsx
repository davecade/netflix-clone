import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import './banner.styles.scss'
import { getSelectedMovie } from '../../redux/film/film.actions'
import YouTube from 'react-youtube';


const opts = {
    height: `400`,
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
};


const Banner = ({bannerData, windowWidth, getSelectedMovie, selectedMovie}) => {
    const [ trailerURL, setTrailerURL ] = useState("")
    const image = useRef()
    const { title, overview } = bannerData

    const handleClick = movie => {
        if(selectedMovie.id) {
            getSelectedMovie({title: '', id: ''})
            setTrailerURL("")
        } else {
            getSelectedMovie(movie)
        }
    }

    useEffect(() => {
        if(selectedMovie.id==='banner') {
            const urlParams = new URLSearchParams(new URL(selectedMovie.url).search)
            setTrailerURL(urlParams.get("v"))
        } else {
            setTrailerURL("")
        }
    }, [selectedMovie])

    return ( 
        <div className="banner__container">
            <div className="banner__image__container">
                <img ref={image} className="banner__image" alt="banner" src={`https://image.tmdb.org/t/p/original${bannerData.backdrop_path}`} style={{
                    width: "100vw",
                }}></img>
                <div className="banner__content" style={{
                    top: `${windowWidth/6}px`,
                    visibility: bannerData.id ? "visible" : "hidden"
                }}>

                    <h1 className="banner__title">
                        {title}
                    </h1>

                    <p className="banner__overview">
                        {overview}
                    </p>
                    <div className="banner__buttons">
                        <button className="banner__play" onClick={() => handleClick({title: bannerData.title, id: 'banner'})}>
                            <i className={`fas fa-${trailerURL ? "stop" : "play"}`}></i>
                            {trailerURL ? "Stop" : "Play"}
                        </button>
                        <button className="banner__info">
                            <i class="fas fa-info-circle"></i>
                            More info
                        </button>
                    </div>
                </div>
            </div>
            <div className="banner__bottom__blur"></div>
            {
                trailerURL ?
                <div className="youtube__container">
                    <div className="youtube__video">
                        <YouTube videoId={trailerURL} opts={opts} />
                    </div>
                </div>
                :
                null
            }
        </div>
    )
    

}

const mapStateToProps = state => ({
    bannerData: state.film.bannerData,
    windowWidth: state.window.windowWidth,
    loading: state.film.loading,
    selectedMovie: state.film.selectedMovie
})

const mapDispatchToProps = dispatch => ({
    getSelectedMovie: movie => dispatch(getSelectedMovie(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
