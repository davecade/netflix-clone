import React from 'react'
import './mainloader.styles.scss'

const MainLoader = ({ displayLoader }) => {
    return (
        <div className="loaderContainer" style={{display: displayLoader ? 'flex' : 'none'}}>
            <h1 className="loading-text">Loading</h1>
            <div class="showbox">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </div>
        </div>
        
    )
}

export default MainLoader
