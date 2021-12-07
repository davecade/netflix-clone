import React from 'react'
import './mainloader.styles.scss'

const MainLoader = ({ displayLoader }) => {
    return (
        <div className="loaderContainer" style={{display: displayLoader ? 'flex' : 'none'}}>
            <h1 className="loading-text">Loading</h1>
            <div className="showbox">
                <div className="loader">
                    <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                </div>
            </div>
        </div>
        
    )
}

export default MainLoader
