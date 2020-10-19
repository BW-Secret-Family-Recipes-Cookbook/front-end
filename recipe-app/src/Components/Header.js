import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'

export default function Header() {

const location = useLocation()

    return (
        <header>
            <h1>Secret Recipe</h1>
            <nav>
                <Link to='/'>Home</Link>
                {/* <Link to='/login' >Login</Link>
                <Link to='/register'>Register</Link> */}
                {location.pathname === '/login' 
                ? null 
                : <Link to='/login' >Login</Link>}
                {location.pathname === '/register' 
                ? null 
                :  <Link to='/register'>Register</Link>}
            </nav>
        </header>
    )
}