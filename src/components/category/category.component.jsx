import React, { useRef } from 'react'
import './category.styles.scss'
import Film from '../film/film.component'

const Category = () => {
    let scroller = useRef()

    const scrollLeft = () => {
        scroller.current.scrollLeft -=1000
    }

    const scrollRight = () => {
        scroller.current.scrollLeft +=1000
    }

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

export default Category
