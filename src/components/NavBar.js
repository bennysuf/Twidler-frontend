import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div>
            <NavLink
                style={{ marginRight: "10px" }}
                to="/home">
                Home
            </NavLink>
            <NavLink
                style={{ marginRight: "10px" }}
                to="/profile">
                Profile
            </NavLink>
        </div>
    )
}
