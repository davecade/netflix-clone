import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { setModalState } from '../../redux/window/window.actions'
import './modal.styles.scss'

const Modal = ({ modalActive, bannerData, setModalState }) => {
    const [ visibility, setVisibility ] = useState("hidden")
    const [ opacity, setOpacity ] = useState("0")
    const [ top, setTop ] = useState("4%")
    const { title, overview, release_date, vote_average, genres } = bannerData
    const modalEl = useRef()

    const handleClick = useCallback( e => {
        if(modalActive && e.target.classList[0].slice(0,5) !== modalEl.current.classList[0].slice(0,5)) {
            setModalState(false)
        }
    }, [modalActive, setModalState])

    const handleKeyDown = useCallback( e => {
        if(modalActive && e.key==='Escape') {
            setModalState(false)
        }
    }, [modalActive, setModalState])

    useEffect(() => {
        if(modalActive) {
            setVisibility("visible")
            setOpacity('1')
            setTop('5.5%')
        } else {
            setVisibility("hidden")
            setOpacity('0')
            setTop('2%')
        }

        if(modalActive) {
            document.addEventListener('click', handleClick);
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('click', handleClick);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [modalActive, handleClick, handleKeyDown])


    return (
        <Fragment>
            <div className="_modal__background" style={{
                visibility: visibility,
                opacity: opacity,
            }}>
                <div ref={modalEl} className="modal" style={{
                    visibility: visibility,
                    opacity: opacity,
                    top: top
                }}>
                    <div className="modal__content">
                        <div className="modal__image__container">
                            <img className="modal__image" alt="poster" src={`https://image.tmdb.org/t/p/original${bannerData.backdrop_path}`}></img>
                            <div className="modal__image__content">
                            </div>
                            <div className="close__button" onClick={() => setModalState(false)}>
                                <div className="line__one"></div>
                                <div className="line__two"></div>
                            </div>
                        </div>
                        <div className="modal__bottom__blur"></div>
                        <div className="modal__info">
                            <h1 className="modal__image__title">
                                {title}
                            </h1>
                            <p className="modal__date__rating">
                                {release_date ? release_date.slice(0,4) : null}
                                {vote_average ? ` - Rating ${Math.floor((vote_average/10)*100)}%` : null}
                            </p>
                            <p className="modal__genres">
                                {genres ? `Genres: ${genres.map(item => ` ${item.name}`)}`: null}
                            </p>
                            <p className="modal__overview">{overview}</p>
                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    modalActive: state.window.modalActive,
    bannerData: state.film.bannerData,
    windowWidth: state.window.windowWidth,
    loading: state.film.loading,
})

const mapDispatchToProps = dispatch => ({
    setModalState: state => dispatch(setModalState(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)