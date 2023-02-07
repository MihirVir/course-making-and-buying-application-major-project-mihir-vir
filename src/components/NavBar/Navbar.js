
import React, {useEffect, useState} from 'react'
import './nav.css'

const Navbar = () => {
    const [open, setOpen] = useState(false)
  return (
    <>
        <header className = "nav">
            <nav className='nav-links'>
                <h1 className='site-name'>
                    Hustler University
                </h1>
                <input type="text" className='search-text'placeholder='type to search..'/>
            
            </nav>
        </header>
        
    </>
  )
}

export default Navbar