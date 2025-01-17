import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { headerData } from '../../data/headerData'
import './Footer.css'

function Footer() {

    const shortname = (name) => {
        if(name.length > 10) {
            return name.split(" ")[0]
        } else {
            return name
        }
    }

    const currentYear = new Date().getFullYear();
    const { theme }  = useContext(ThemeContext)

    return (
        <div className="footer" style={{backgroundColor: theme.secondary}}>
            <p style={{color: theme.tertiary}}>
            &#169; {currentYear}
                <span style={{color: theme.primary, margin: '0 0.5rem -1rem 0.5rem'}}>
                    
                </span>
                 {shortname(headerData.name)}.
            </p>
        </div>
    )
}

export default Footer

