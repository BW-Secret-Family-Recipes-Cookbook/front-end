import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'

export default function Header() {

    const Header = styled.header`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: 0 auto;
    nav {

    }
    nav a{
        padding: 5%;
        text-decoration: none;
        color: black;
        border: 1px solid black;
    }
    `

const location = useLocation()

    return (
        <Header>
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
        </Header>
    )
}