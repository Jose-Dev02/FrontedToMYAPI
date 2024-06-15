import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderNav = () => {
    return (

        <header className='header'>
            <div className='logo'>
                <span>JL</span>
                <h3> Jose Luis Matos Sosa Web</h3>

            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to='/home'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > Home </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/portafolio'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > Portafolio </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/service'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > Service </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/cv'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > CV </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/contactus'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > Contact Us </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? "activated" : ""}
                        > Log Out </NavLink>

                    </li>
                </ul>
            </nav>
        </header>
    )
}
