import React, { useState } from 'react'
import './banner.styles.scss'

const Banner = ({url}) => {

    return (
        <div className="banner__container">
            <img className="banner__image" alt="banner" src={url} style={{
            width: "100vw"
            }}></img>
            <div className="banner__bottom__blur"></div>
        </div>
    )
}

export default Banner
