import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import './searchbar.styles.scss'
import { setSearchBarState } from '../../redux/window/window.actions'

const searchBarOpenStyle = {
    width: "29rem"
}

const searchBarClosedStyle = {
    width: "3.5rem",
    border: "none",
    backgroundColor: "transparent"
}


const Searchbar = ({ placeholder, searchBarOpen, setSearchBarOpen }) => {
    const [ searchBarStyles , setSearchBarStyles ] = useState(searchBarClosedStyle)
    const [ searchBarValue, setSearchBarValue ] = useState("")
    const searchbarEl = useRef()

    const handleClick = useCallback( e => {
        if(searchBarOpen && e.target !== searchbarEl.current && searchBarValue==="") {
            setSearchBarOpen(false)
        }
    }, [searchBarOpen, searchBarValue, setSearchBarOpen])

    const handleClickOnSearch = useCallback(() => {
        if(searchBarOpen===false) {
            setSearchBarOpen(true)
        } else if(searchBarValue==="") {
            setSearchBarOpen(false)
        }
    }, [searchBarOpen, searchBarValue, setSearchBarOpen])

    const handleClickCloseIcon = () => {
        setSearchBarValue("")
        setSearchBarOpen(false)
    }

    useEffect(() => {
        if(searchBarOpen) {
            setSearchBarStyles(searchBarOpenStyle)
        } else {
            setSearchBarStyles(searchBarClosedStyle)
        }

        if(searchBarOpen) {
            document.addEventListener('click', handleClick);
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [searchBarOpen, handleClick])

    const inlineStyles = useMemo(() => ({
        searchbar: {
            backgroundColor: searchBarOpen ? "" : "transparent"
        }
    }), [searchBarOpen])

    return (
        <div  className="searchbar__container" style={searchBarStyles}>
            <i className="fas fa-search" onClick={handleClickOnSearch}></i>
            <input ref={searchbarEl}
                className="searchbar"
                value={searchBarValue}
                onChange={e => setSearchBarValue(e.target.value)}
                type="text" placeholder={placeholder}
                style={inlineStyles.searchbar} />
            <i className="fas fa-times" onClick={handleClickCloseIcon} style={{visibility: searchBarValue==="" ? "hidden" : "visible"}}></i>
        </div>
    )
}


const mapStateToProps = state => ({
    searchBarOpen: state.window.searchBarActive
})

const mapDispatchToProps = dispatch => ({
    setSearchBarOpen: status => dispatch(setSearchBarState(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
