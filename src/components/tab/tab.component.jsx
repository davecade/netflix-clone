import React from 'react'
import './tab.styles.scss'

const Tab = ({ title }) => {
    return (
        <div className="navbar__tab">
            {title}
        </div>
    )
}

export default Tab