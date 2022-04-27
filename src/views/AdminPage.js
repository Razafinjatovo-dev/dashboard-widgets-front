import React, {useContext, useState} from 'react';
import {AuthContext} from "../contexts/AuthContext";

const AdminPage = () => {
    document.querySelector('title').innerText = 'Admin';
    const {userToken} = useContext(AuthContext);
    return (
        <div>
            <h1>ADMIN PAGE </h1>
            <p>token : {userToken}</p>
        </div>
    );
};
export default AdminPage;