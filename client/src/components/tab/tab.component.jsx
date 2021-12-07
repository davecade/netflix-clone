import React from 'react'
import './tab.styles.scss'

const Tab = ({ title, className }) => {
    return (
        <div className={className}>
            {title}
        </div>
    )
}

export default Tab