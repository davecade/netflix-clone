import React, { useRef } from 'react';
import { connect } from 'react-redux'
import './banner.styles.scss'

const Banner = ({bannerData, windowWidth}) => {
    const image = useRef()
    const { title, overview } = bannerData

    return ( 
        <div className="banner__container">
            <div className="banner__image__container">
                <img ref={image} className="banner__image" alt="banner" src={`https://image.tmdb.org/t/p/original${bannerData.backdrop_path}`} style={{
                    width: "100vw",
                }}></img>
                <div className="banner__content" style={{
                    top: `${windowWidth/5}px`,
                    visibility: bannerData.id ? "visible" : "hidden"
                }}>

                    <h1 className="banner__title">
                        {title}
                    </h1>

                    <p className="banner__overview">
                        {overview}
                    </p>
                    <div className="banner__buttons">
                        <button className="banner__play">
                            <i class="fas fa-play"></i>
                            Play
                        </button>
                        <button className="banner__info">
                            <i class="fas fa-info-circle"></i>
                            More info
                        </button>
                    </div>
                </div>
            </div>
            <div className="banner__bottom__blur"></div>
        </div>
    )
    

}

const mapStateToProps = state => ({
    bannerData: state.film.bannerData,
    windowWidth: state.window.windowWidth,
    loading: state.film.loading
})

export default connect(mapStateToProps)(Banner)
