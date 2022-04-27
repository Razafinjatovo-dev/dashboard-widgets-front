import React, {useEffect} from 'react';
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";

const Logout = ({userToken, setUserToken}) => {
    const history = useHistory();
    useEffect(() => {
        //Remove token in cookies
        Cookies.remove('userToken');

        //Clear local storage
        localStorage.removeItem('userProfile')
        localStorage.removeItem('widgetsData')

        //Remove user token from state in App.js
        setUserToken('');

        //Redirect to home
        history.push('/')

    })
    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;

