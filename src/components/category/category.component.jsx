import React, { Fragment, useRef, useEffect, useState } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';

const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

const categoryKeyMap = {
    0: "Popular on Netflix",
    1: "Trending Now",
    2: "Action",
    3: "Adventure",
    4: "Animation",
    5: "Comedy",
    6: "Crime",
    7: "Documentary"
}

const Category = ({ windowWidth, category, categoryID, loading, selectedMovie }) => {
    const [ scrollValue , setScrollValue ] = useState(windowWidth)
    const [ trailerURL, setTrailerURL ] = useState("")
    let scroller = useRef()

    const scrollLeft = () => {
        scroller.current.scrollLeft -=scrollValue
    }

    const scrollRight = () => {
        scroller.current.scrollLeft +=scrollValue
    }

    useEffect(() => {
        setScrollValue(windowWidth-25)
    }, [windowWidth])

    useEffect(() => {
        if(selectedMovie.id===categoryID) {
            const urlParams = new URLSearchParams(new URL(selectedMovie.url).search)
            setTrailerURL(urlParams.get("v"))
        } else {
            setTrailerURL("")
        }
    }, [selectedMovie, categoryID])

    return (
        <Fragment>
            <div className="category__container" style={{
                visibility: loading ? "hidden" : "visible"
            }}>
                <div className="category__title">
                    <h2>{categoryKeyMap[categoryID]}</h2>
                </div>
                <div  className="category__content">
                    <div onClick={scrollLeft} className="scroll__left">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                        <div ref={scroller} className="category__items">
                            {
                                category ? 
                                category.map( (film, index) => {
                                    return <Film key={index} categoryID={categoryID} id={index} film={film} />
                                })
                                :
                                <div>None</div>
                            }
                        </div>
                    <div onClick={scrollRight} className="scroll__right">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            {   trailerURL ? 
                <div className="youtube__container">
                    <div className="youtube__video">
                        <YouTube videoId={trailerURL} opts={opts} />
                    </div>
                </div>
                : null
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    windowWidth: state.window.windowWidth,
    loading: state.film.loading,
    selectedMovie: state.film.selectedMovie
})

export default connect(mapStateToProps)(Category)
