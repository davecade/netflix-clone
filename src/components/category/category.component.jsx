import React, { Fragment, useRef, useEffect, useState, useCallback } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';



const categoryKeyMap = {
    0: "Popular on Netflix",
    1: "Trending Now",
    2: "Action Movies",
    3: "Adventure Movies",
    4: "Fantasy Movies",
    5: "Science Fiction Movies",
    6: "Animation Movies",
    7: "Comedy Movies"
}

const opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
};

const Category = ({ windowWidth, category, categoryID, loading, selectedMovie, modalActive }) => {
    const [ scrollValue , setScrollValue ] = useState(windowWidth)
    const [ trailerURL, setTrailerURL ] = useState("")
    let scroller = useRef()

    const scrollLeft = useCallback(() => {
        scroller.current.scrollLeft -=scrollValue
    }, [scrollValue])

    const scrollRight = useCallback(() => {
        scroller.current.scrollLeft +=scrollValue
    }, [scrollValue])

    useEffect(() => {
        setScrollValue(windowWidth-200)

        // if(windowWidth > 1800) {
        //     setYoutubHeight(`800`)
        // } else if(windowWidth > 1600) {
        //     setYoutubHeight(`600`)
        // } else {
        //     setYoutubHeight(`400`)
        // }

    }, [windowWidth])

    useEffect(() => {
        if(selectedMovie.id===categoryID) {
            try {
                const urlParams = new URLSearchParams(new URL(selectedMovie.url).search)
                setTrailerURL(urlParams.get("v"))
            } catch(error) {
                setTrailerURL("DB68T2s7gfI")
            }

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
                    <div onClick={scrollLeft} className="scroll__left" style={{
                        visibility: modalActive ? 'hidden' : 'visible'
                    }}>
                        <i class="fas fa-chevron-left"></i>
                    </div>
                        <div ref={scroller} className="category__items">
                            {
                                category ? 
                                category.map( (film, index) => {
                                    return <Film key={index} categoryID={categoryID} id={index} film={film} />
                                })
                                : null
                            }
                        </div>
                    <div onClick={scrollRight} className="scroll__right" style={{
                        visibility: modalActive ? 'hidden' : 'visible'
                    }}>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            {   trailerURL ? 
                <div className="youtube__container">
                    <YouTube className={"youtube__video"} videoId={trailerURL} opts={opts} />
                </div>
                : null
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    windowWidth: state.window.windowWidth,
    loading: state.film.loading,
    selectedMovie: state.film.selectedMovie,
    modalActive: state.window.modalActive
})

export default connect(mapStateToProps)(Category)
