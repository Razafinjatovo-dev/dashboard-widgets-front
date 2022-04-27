import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const NavBar = ({userToken}) => {

    return (
        <nav className='navbar_container'>
            {/*<h3>Current token: {userToken}</h3>*/}
            <Link to='/'>Home</Link>
            {userToken && <Link to='/myDashboard'>My Dashboard</Link>}
            {!userToken && <Link to='/register'>Register</Link>}
            {/*{userToken && <Link to='/admin'>Admin</Link>}*/}
            {!userToken && <Link to='/login'>Login</Link>}
            {userToken && <Link to='/logout'>Logout</Link>}
        </nav>
    );
};

export default NavBar;