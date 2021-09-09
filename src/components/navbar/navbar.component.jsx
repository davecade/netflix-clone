import React, { useEffect, useState, useCallback } from 'react';
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
            </div>
        </div>
    )
}

export default Navbar;
