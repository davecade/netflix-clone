import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux'
import './banner.styles.scss'
import { getSelectedMovie, setSelectedMovie } from '../../redux/film/film.actions'
import YouTube from 'react-youtube';
import { setModalState } from '../../redux/window/window.actions';


//-- Youtube component options
const opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
};

const Banner = ({bannerData, windowWidth, getSelectedMovie, setSelectedMovie, selectedMovie, setModalState}) => {
    const [ trailerURL, setTrailerURL ] = useState("")
    const image = useRef()
    const { title } = bannerData

    const movieDetails = useMemo(() => ({
        title: bannerData.title,
        id: 'banner',
        movieID: bannerData.id
    }), [bannerData])

    const handleClick = async movie => {
        if(selectedMovie.id==='banner') {
            await setSelectedMovie({ url: '', id: '', title: '' })
            setTrailerURL("")
        } else {
            getSelectedMovie(movie)
        }
    }

    useEffect(() => {
        if(selectedMovie.id==='banner' && selectedMovie.url) {
            try {
                const urlParams = new URLSearchParams(new URL(selectedMovie.url).search)
                setTrailerURL(urlParams.get("v"))
            }catch(error) {
                console.log(error)
            }
        } else {
            setTrailerURL("")
        }
    }, [selectedMovie])

    const contentPosition = useCallback(() => {
        if(windowWidth > 2000) {
            return windowWidth/6
        } else {
            return windowWidth/5
        }
        
    }, [windowWidth])


    const inlineStyles = useMemo(() => ({
        bannerContainer: {
            minHeight: windowWidth > 2000 ? "70rem" : ""
        },
        bannerContent: {
            top: `${contentPosition()}px`,
            visibility: bannerData ? "visible" : "hidden"
        }
    }), [windowWidth, bannerData, contentPosition])

    return ( 
        <div className="banner__container" style={inlineStyles.bannerContainer}>
            <div className="banner__image__container">
                <img ref={image} className="banner__image" alt="banner" src={bannerData.backdrop_path ? `https://image.tmdb.org/t/p/original${bannerData.backdrop_path}`: ''}></img>
                <div className="banner__content" style={inlineStyles.bannerContent}>

                    <h1 className="banner__title">
                        {title}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__play" onClick={() => handleClick(movieDetails)}>
                            <i className={`fas fa-${trailerURL ? "stop" : "play"}`}></i>
                            {trailerURL ? "Stop" : "Play"}
                        </button>
                        <button className="banner__info" onClick={() => setModalState(true)}>
                            <i className="fas fa-info-circle"></i>
                            More info
                        </button>
                    </div>
                </div>
            </div>
            <div className="banner__bottom__blur"></div>
            {
                trailerURL ?
                <div className="youtube__container">
                        <YouTube className={"youtube__video"} videoId={trailerURL} opts={opts} />
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
    getSelectedMovie: movie => dispatch(getSelectedMovie(movie)),
    setSelectedMovie: movie => dispatch(setSelectedMovie(movie)),
    setModalState: state => dispatch(setModalState(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
