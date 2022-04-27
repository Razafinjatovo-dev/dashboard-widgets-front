import {DB_URI} from "../conf/conf";
import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import {WidgetContext} from "../contexts/WidgetContext";
import Cookies from 'js-cookie';
import {UserContext} from "../contexts/UserContext";


const LoginPage = (props) => {
    document.querySelector('title').innerText = 'Login';
    const {setUserProfile} = useContext(UserContext);
    const {widgetsData, setWidgetsData} = useContext(WidgetContext);
    const {userToken, setUserToken} = props;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [userCredentials, setUserCredentials] = useState({})
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setIsLoading(true);
            const init = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userCredentials)
            }
            const response = await fetch(`${DB_URI}/login`, init);
            if (response.ok && response.status === 201) {
                const data = await response.json();
                setUserToken(data.access_token);
                Cookies.set('userToken', data.access_token);
                // console.log('user current widgets', data.user.widgetsData);

                //store user profile (complete infos) in localstorage
                localStorage.setItem('userProfile', JSON.stringify({_id: data.user._id,username: data.user.username}))

                //store widgets data in localstorage
                localStorage.setItem('widgetsData', JSON.stringify(data.user.widgetsData))
                //store widgets data in WidgetContext
                setWidgetsData(data.user.widgetsData);
                //End loading
                setIsLoading(false);
                //redirect to 'MyDashboard'
                history.push('/myDashboard')
                // console.log(data);
            } else {
                setIsLoading(false);
                alert('Login failed');
                history.push('/login');
            }
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
            alert('Login failed');
            history.push('/login');
        }
    };

    const Form = <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' required onChange={handleChange}/>
        <label>Password</label>
        <input type='password' name='password' required onChange={handleChange}/>
        <button>Login</button>
    </form>

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div>{Form}</div>}
        </div>
    );
};

export default LoginPage;