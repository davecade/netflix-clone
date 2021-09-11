import React, { useEffect, useState, useCallback } from 'react';
import Tab from '../tab/tab.component'
import Searchbar from '../searchbar/searchbar.component'
import Tabdropdown from '../tabdropdown/tabdropdown.component'
import './navbar.styles.scss'

//-- Transparent styles
const navBarTransparent = {
    background: "linear-gradient(to top, rgba(18, 18, 17, 0), rgba(18, 18, 17, 1))"
}
const navBarSolid = {
    backgroundColor: "#131312"
}

const Navbar = () => {
    const [ offset, setOffset ] = useState(0);
    const [ background, setBackground ] = useState({})
    const [ browserWidth, setBrowserWidth ] = useState(window.innerWidth)
    const [ dropdownState, setDropdownState ] = useState(false)

    const handleScroll = useCallback(() => {
        if(offset > 20) {
            setBackground(navBarSolid)
        } else {
            setBackground(navBarTransparent)
        }
    }, [offset])

    useEffect(()=> {
        window.onresize = () => {
            setBrowserWidth(window.innerWidth)
        }
    })

    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset)
            handleScroll()
        }
    }, [handleScroll]);

    const handleBrowseMouseEnter = () => {
        setDropdownState(true)
    }

    const handleBrowseMouseLeave = () => {
        setDropdownState(false)
    }

    return (
        <div className="navbar" style={background}>
            <div className="navbar__content">
                <div className="navbar__left">
                    <h1 className="navbar__title">NETFLIX</h1>

                    {
                        browserWidth < 1410 ?
                        <div className="navbar__browse"
                            onMouseEnter={handleBrowseMouseEnter}
                            onMouseLeave={handleBrowseMouseLeave}
                        >
                            <h4>Browse</h4>
                            <i className="fas fa-sort-down"></i>
                        </div>
                        :
                        <div className="navbar__tabs">
                            <Tab className={"navbar__tab"} title={"Home"} />
                            <Tab className={"navbar__tab"} title={"TV Shows"} />
                            <Tab className={"navbar__tab"} title={"Movies"} />
                            <Tab className={"navbar__tab"} title={"New & Popular"} />
                            <Tab className={"navbar__tab"} title={"My List"} />
                            <Tab className={"navbar__tab"} title={"Watch it again"} />
                        </div>
                    }

                </div>
                <div className="navbar__right">
                    <Searchbar placeholder={"Titles, people, genres"} />
                </div>
            </div>
            <Tabdropdown dropdownState={dropdownState}/>
        </div>
    )
}

export default Navbar;
