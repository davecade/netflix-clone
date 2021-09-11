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
    console.log("Navbar rendered")
    const [ offset, setOffset ] = useState(0);
    const [ background, setBackground ] = useState({})
    const [ browserWidth, setBrowserWidth ] = useState(window.innerWidth)

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


    return (
        <div className="navbar" style={background}>
            <div className="navbar__left">
                <h1 className="navbar__title">NETFLIX</h1>

                {
                    browserWidth < 1000 ?
                    <div className="navbar__browse">
                        <h4>Browse</h4>
                        <i className="fas fa-sort-down"></i>
                    </div>
                    :
                    <div className="navbar__tabs">
                        <Tab title={"Home"} />
                        <Tab title={"TV Shows"} />
                        <Tab title={"Movies"} />
                        <Tab title={"New & Popular"} />
                        <Tab title={"My List"} />
                        <Tab title={"Watch it again"} />
                    </div>
                }

            </div>
            <div className="navbar__right">
                <Searchbar />
            </div>

        </div>
    )
}

export default Navbar;
