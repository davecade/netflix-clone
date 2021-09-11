import React, { useState, useRef, useCallback } from 'react'
import { useEffect } from 'react/cjs/react.development'
import './searchbar.styles.scss'

const searchBarOpenStyle = {
    width: "29rem"
}

const searchBarClosedStyle = {
    width: "3.5rem",
    border: "none",
    backgroundColor: "transparent"
}


const Searchbar = ({ placeholder }) => {
    const [ searchBarOpen, setSearchBarOpen ] = useState(false)
    const [ searchBarStyles , setSearchBarStyles ] = useState({})
    const [ searchBarValue, setSearchBarValue ] = useState("")
    const searchbarEl = useRef()

    const handleClick = useCallback( e => {
        if(searchBarOpen && e.target !== searchbarEl.current && searchBarValue==="") {
            setSearchBarOpen(false)
        }
    }, [searchBarOpen, searchBarValue])

    const handleClickOnSearch = useCallback(() => {
        if(searchBarOpen===false) {
            setSearchBarOpen(true)
        } else if(searchBarValue==="") {
            setSearchBarOpen(false)
        }
    }, [searchBarOpen, searchBarValue])

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

    return (
        <div  className="searchbar__container" style={searchBarStyles}>
            <i className="fas fa-search" onClick={handleClickOnSearch}></i>
            <input ref={searchbarEl} className="searchbar" value={searchBarValue} onChange={e => setSearchBarValue(e.target.value)} type="text" placeholder={placeholder} style={
                {backgroundColor: searchBarOpen ? "" : "transparent"}
            } />
            <i class="fas fa-times" onClick={handleClickCloseIcon} style={{visibility: searchBarValue==="" ? "hidden" : "visible"}}></i>
        </div>
    )
}

export default Searchbar
