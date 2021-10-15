import React from 'react'
import {NavLink,Link } from 'react-router-dom';
import cookie from 'js-cookie';


function Navbar() {

    const signedIn = cookie.get('token') || undefined;

    return (
        <>
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
               <Link to='/' className='brand-logo'>GeeksforGeeks</Link>
               {signedIn ? <SignedInLinks/> :   <SignedOutLinks/>}
                  
            </div>
        </nav>
            
        </>
    )
}

const SignedInLinks=()=>{
  return (
      <>
      <ul className="right">
          <li><NavLink to='/create'>Create</NavLink></li>
          <li><NavLink  to='/'>Logout</NavLink></li>
          <li><NavLink  to='/' className='btn btn-floating pink lighten-1'>SV</NavLink></li>
      </ul>
      </>
  )
}
const SignedOutLinks=()=>{
    return (
        <>
        <ul className="right">
            <li><NavLink to='/'>Signup</NavLink></li>
            <li><NavLink  to='/'>Login</NavLink></li>
            {/* <li><NavLink  to='/'></NavLink></li> */}
        </ul>
        </>
    )
}

export default Navbar
