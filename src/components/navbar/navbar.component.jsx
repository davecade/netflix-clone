import React, { useEffect, useState, useCallback } from 'react';
import Tab from '../tab/tab.component'
import Searchbar from '../searchbar/searchbar.component'
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

    const handleScroll = useCallback(() => {
        if(offset > 20) {
            setBackground(navBarSolid)
        } else {
            setBackground(navBarTransparent)
        }
    }, [offset])

    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset)
            handleScroll()
        }
    }, [handleScroll]);


    return (
        <div className="navbar" style={background}>
            <div className="navbar__left">
                <h1 className="navbar__title">NETFLIX</h1>
                <div className="navbar__tabs">
                    <Tab title={"Home"} />
                    <Tab title={"TV Shows"} />
                    <Tab title={"Movies"} />
                    <Tab title={"New & Popular"} />
                    <Tab title={"My List"} />
                    <Tab title={"Watch it again"} />
                </div>
            </div>

            <div className="navbar__right">
                <Searchbar />
            </div>
        </div>
    )
}

export default Navbar;
