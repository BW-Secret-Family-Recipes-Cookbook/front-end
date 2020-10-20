import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SRHeader = styled.header`
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

export default function Header() {

const location = useLocation()

    return (
        <SRHeader>
            <h1>Secret Recipe</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/login' >Login</Link>
                <Link to='/register'>Register</Link>


            </nav>
        </SRHeader>
    )
}