import React from 'react'
import image1 from '../images/logo512.png'
const NavBar = () => {
  return (
    <nav>
        <img src= {image1} width="40px" className='nav--icon'/>
        <h3 className='nav--logo_text'>ReactFacts</h3>
        <h4 className='nav--title'>React Course - Project 1</h4>
    </nav>
  )
}

export default NavBar