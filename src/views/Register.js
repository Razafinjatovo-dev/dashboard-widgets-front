import {DB_URI} from "../conf/conf";
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

const Register = () => {
    document.querySelector('title').innerText = 'Register';
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({});

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const init = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            }
            const response = await fetch(`${DB_URI}/users`,
                init);
            if (response.ok && response.status === 201) {
                const data = await response.json();
                // console.log(data);
                setIsLoading(false);
                history.push('login');
            } else {
                setIsLoading(false);
                alert('Registration failed');
                history.push('/');
            }
        } catch (e) {
            const message = `Registration failed: ${e.message}`;
            setIsLoading(false);
            alert(message);
        }
    }

    const Form =
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' name='username' required onChange={handleChange}/>
            <label>Email</label>
            <input type='email' name='email' required onChange={handleChange}/>
            <label>Password</label>
            <input type='password' name='password' required onChange={handleChange}/>
            <button>Register</button>
        </form>
    return (
        <>
            {isLoading ? <div>Loading...</div> : <div>{Form}</div>}
        </>
    );
};

export default Register;