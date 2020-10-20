import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/steak.svg'


// Header Styling
const SRHeader = styled.header`
color: #787878;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
width: 85%;
margin: 0 auto;

svg {
    width: 50px;
    height: auto;
    margin-right: 15px;

}
div {
    display:flex;
}
nav {
    display: flex;
    flex-flow: row nowrap;
    width: 200px;

}
nav a{
    margin: 1%;
    padding: 3% 5%;
    text-decoration: none;
    color: #787878;
    border: solid 3px #efefef;
    border-radius: 0.35rem;
    :hover {
        color: #49bf9d;
        border: solid 3px #49bf9d;
        transition: background-color 0.2s ease-in-out, 
        color 0.2s ease-in-out, 
        border-color 0.2s ease-in-out;
    }
}
`

export default function Header() {

const location = useLocation()

    return (
        <SRHeader>
            <div>
            <Logo />
            <h1>Secret Family Recipe</h1>
            </div>
            <nav>
                <a href='https://quizzical-heisenberg-4d47a4.netlify.app/'>Home</a>
                <Link to='/login' >Login</Link>
                <Link to='/register'>Register</Link>


            </nav>
        </SRHeader>
    )
}