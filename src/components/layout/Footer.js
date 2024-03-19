import React from 'react'

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className='footer'>
            Portafolio Jose Luis Matos Sosa Web &copy; Master React - {year}
        </footer>
    )
}
