import React, { useRef, useEffect, useCallback } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'
import { connect } from 'react-redux'
import { useState } from 'react/cjs/react.development'

const Category = ({ windowWidth }) => {
    const [ scrollValue , setScrollValue ] = useState(0)
    let scroller = useRef()

    const scrollLeft = useCallback(() => {
        scroller.current.scrollLeft -=scrollValue
    }, [scrollValue])

    const scrollRight = useCallback(() => {
        scroller.current.scrollLeft +=scrollValue
    }, [scrollValue])

    useEffect(() => {
        setScrollValue(windowWidth-50)
    }, [windowWidth])

    return (
        <div  className="category__container">
            <div onClick={scrollLeft} className="scroll__left">
                <i class="fas fa-chevron-left"></i>
            </div>
                <div ref={scroller} className="category__items">
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                    <Film />
                </div>
            <div onClick={scrollRight} className="scroll__right">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    windowWidth: state.window.windowWidth
})

export default connect(mapStateToProps)(Category)
