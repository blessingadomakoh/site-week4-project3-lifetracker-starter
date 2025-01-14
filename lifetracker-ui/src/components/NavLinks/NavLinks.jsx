import React from 'react';
import { Link } from 'react-router-dom';
import './NavLinks.css';

function NavLinks( {loggedIn}) {

  const handleLogout = () => {
    //remove the stored token and setLoggedIn as false
    localStorage.removeItem("token");
    window.location = "/"; //refresh the page
  };

  return (
    <div className='nav-links'>
      <div className='links'>
        <Link to='/activity'>Activity</Link>
        <Link to='/exercise'>Exercise</Link>
        <Link to='/nutrition'>Nutrition</Link>
        <Link to='/sleep'>Sleep</Link>
      </div>
      <div>
      {loggedIn ?
       (<button onClick={handleLogout}>Logout</button>) :
       <div className='buttons'>
       <button className='login-button'>
         <Link to='/login'>Login</Link>
       </button>
       <button className='register-button'>
         <Link to='/register'>Sign Up</Link>
       </button>
     </div>
       }

      </div>
    </div>
  );
}

export default NavLinks;


