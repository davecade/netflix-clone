import React, { useEffect, useState, useCallback , useLayoutEffect, useMemo} from 'react';
import Tab from '../tab/tab.component'
import Searchbar from '../searchbar/searchbar.component'
import Tabdropdown from '../tabdropdown/tabdropdown.component'
import './navbar.styles.scss'
import { connect } from 'react-redux';
import { setWindowWidth, setWindowHeight } from '../../redux/window/window.actions'

//-- Transparent styles
const navBarTransparent = {
    background: "linear-gradient(to top, rgba(18, 18, 17, 0), rgba(18, 18, 17, 1))"
}
const navBarSolid = {
    backgroundColor: "black"
    //--#131312
}

const Navbar = ({setWindowWidth, setWindowHeight,  windowWidth, searchBarOpen }) => {
    const [ offset, setOffset ] = useState(0);
    const [ background, setBackground ] = useState({})
    const [ dropdownState, setDropdownState ] = useState(false)
    const [ tabsOpacity, setTabsOpacity ] = useState(0)
    const [ tabsVisibility, setTabsVisibility ] = useState('hidden')

    const handleScroll = useCallback(() => {
        if(offset > 20) {
            setBackground(navBarSolid)
        } else {
            setBackground(navBarTransparent)
        }
    }, [offset])

    useLayoutEffect(() => {
        if(windowWidth < 1485 && searchBarOpen) {
            setTabsOpacity(0)
            setTabsVisibility("hidden")
        } else {
            setTimeout(() => {
                setTabsOpacity(1)
                setTabsVisibility("visible")
            }, 200)
        }

    }, [searchBarOpen, windowWidth])

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [setWindowWidth, setWindowHeight])

    useEffect(()=> {
        window.onresize = () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
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

    const inlineStyles = useMemo(() => ({
        navbarTabs: {
            opacity: tabsOpacity,
            visibility: tabsVisibility
        }
    }), [tabsOpacity, tabsVisibility])

    return (
        <div className="navbar" style={background}>
            <div className="navbar__content">
                <div className="navbar__left">
                    <h1 className="navbar__title">NETFLEX</h1>

                    {
                        (windowWidth < 1485 && searchBarOpen) || (windowWidth < 1100) ?
                        <div className="navbar__browse"
                            onMouseEnter={handleBrowseMouseEnter}
                            onMouseLeave={handleBrowseMouseLeave}
                        >
                            <h4>Browse</h4>
                            <i className="fas fa-sort-down"></i>
                        </div>
                        :
                        <div className="navbar__tabs" style={inlineStyles.navbarTabs}>
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
                    <i className="fas fa-bell"></i>
                    <div className="navbar__account">
                        <img className="navbar__account__portrait" src="./assets/smile.jpg" alt="" />
                    </div>
                </div>
            </div>
            <Tabdropdown dropdownState={dropdownState}/>
        </div>
    )
}

const mapStateToProps = state => ({
    windowWidth: state.window.windowWidth,
    windowHeight: state.window.windowHeight,
    searchBarOpen: state.window.searchBarActive
})

const mapDispatchToProps = dispatch => ({
    setWindowWidth: width => dispatch(setWindowWidth(width)),
    setWindowHeight: height => dispatch(setWindowHeight(height))
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
