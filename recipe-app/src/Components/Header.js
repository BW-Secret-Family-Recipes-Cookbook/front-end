import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/steak.svg'


// Header Styling
const SRHeader = styled.header`
color: #787878;
display: flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: center;
width: 85%;
margin: 0 auto 1.5rem auto;
box-shadow: 0 10px 10px -15px black;
svg {
    width: 50px;
    height: auto;
    margin-right: 15px;

}
div {
    display:flex;
}
nav {
    width: 15.5rem;
    display: flex;
    flex-flow: row nowrap;
}
nav a{
    margin: 1%;
    padding: 3% 5%;
    text-decoration: none;
    color: #787878;
    border: solid 3px #efefef;
    border-radius: 0.35rem;
    white-space: nowrap;
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
                {location.pathname.includes('/recipe')
                ? <Link to='/' >Logout</Link> 
                : <Link to='/login' >Login</Link>}
                {location.pathname.includes('/recipe')
                ? <Link to='/recipes/all' >All Recipes</Link> 
                : <Link to='/register'>Register</Link>}
                {/* {location.pathname.includes('/recipe')
                ? <Link to='/recipe/all' >All Recipes</Link> 
                : null} */}


            </nav>
        </SRHeader>
    )
}