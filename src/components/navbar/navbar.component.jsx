import React, { useEffect, useState, useMemo } from 'react';
import './navbar.styles.scss'

//-- background: linear-gradient(to top, rgba(18, 18, 17, 0), rgba(18, 18, 17, 1));

const Navbar = () => {


    const [offset, setOffset] = useState(0);
    const [ background, setBackground ] = useState({})

    const navBarTransparent ={
        background: "linear-gradient(to top, rgba(18, 18, 17, 0), rgba(18, 18, 17, 1))"
    }

    const navBarSolid = {
        backgroundColor: "#131312"
    }

    const handleScroll = () => {
        console.log("offset", offset)
        if(offset > 20) {
            setBackground(navBarSolid)
        } else {
            setBackground(navBarTransparent)
        }
    }

    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset)
            handleScroll()
        }
    }, [window.pageYOffset, handleScroll]);




    return (
        <div className="navbar" style={background}>
            
        </div>
    )
}

export default Navbar;
