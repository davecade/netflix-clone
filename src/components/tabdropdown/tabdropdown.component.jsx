import React, { useState, useEffect } from 'react'
import Tab from '../tab/tab.component'
import './tabdropdown.styles.scss'

const Tabdropdown = ({ dropdownState }) => {
    const [ visibility, setVisibility ] = useState(dropdownState)

    useEffect(() => {
        setVisibility(dropdownState)
    }, [dropdownState])

    const handleBrowseMouseEnter = () => {
        setVisibility(true)
    }

    const handleBrowseMouseLeave = () => {
        setVisibility(false)
    }

    return (
        <div className="tabdropdown__container" style={{
            visibility: visibility ? "visible" : "hidden"
        }}
            onMouseEnter={handleBrowseMouseEnter}
            onMouseLeave={handleBrowseMouseLeave}
        >
            <div className="icon-container">
                <i className="fas fa-sort-up"></i>
            </div>
            <div className="tabdropdown__box">
                <Tab className={"tabdropdown__tab"} title={"Home"} />
                <Tab className={"tabdropdown__tab"} title={"TV Shows"} />
                <Tab className={"tabdropdown__tab"} title={"Movies"} />
                <Tab className={"tabdropdown__tab"} title={"New & Popular"} />
                <Tab className={"tabdropdown__tab"} title={"My List"} />
                <Tab className={"tabdropdown__tab"} title={"Watch it again"} />
            </div>
        </div>
    )
}

export default Tabdropdown
