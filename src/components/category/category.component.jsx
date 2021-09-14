import React, { useRef, useEffect } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'
import { connect } from 'react-redux'
import { Fragment, useState } from 'react/cjs/react.development'

const Category = ({ windowWidth, category, title }) => {
    const [ scrollValue , setScrollValue ] = useState(windowWidth)
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

    return (
        <Fragment>
            <div className="category__container">
                <div className="category__title">
                    <h2>{title}</h2>
                </div>
                <div  className="category__content">
                    <div onClick={scrollLeft} className="scroll__left">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                        <div ref={scroller} className="category__items">
                            {
                                category ? 
                                category.map( (film, index) => {
                                    return <Film id={index} film={film} />
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
        </Fragment>
    )
}

const mapStateToProps = state => ({
    windowWidth: state.window.windowWidth,
})

export default connect(mapStateToProps)(Category)
