import React, { useRef, useEffect } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'
import { connect } from 'react-redux'
import { useState } from 'react/cjs/react.development'

const Category = ({ windowWidth }) => {
    const [ scrollValue , setScrollValue ] = useState(windowWidth)
    let scroller = useRef()

    const scrollLeft = () => {
        scroller.current.scrollLeft -=scrollValue
    }

    const scrollRight = () => {
        scroller.current.scrollLeft +=scrollValue
    }

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
