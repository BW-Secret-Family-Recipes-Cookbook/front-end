import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'

export default function Header() {

    let location = useLocation()

    return (
        <header>
            <Router>
                {location === '/login'  && <Link to='/login' >Login</Link>}
                {location === '/register' && <Link to='/register'>Register</Link>}
                {location === '/'}
            </Router>
        </header>
    )
}