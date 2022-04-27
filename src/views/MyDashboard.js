import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import {WidgetContext} from "../contexts/WidgetContext";
import Cookies from 'js-cookie';
import BitCoinWidget from "../components/BitCoinWidget";
import {Link} from "react-router-dom";
import CovidWidget from "../components/CovidWidget";
import CryptoFiveWidget from "../components/CryptoFiveWidget";


const MyDashboard = () => {
    document.querySelector('title').innerText = 'My dashboard';
    const userToken = Cookies.get('userToken');
    const [isLoading, setIsLoading] = useState(true);
    const [widgetsData, setWidgetsData] = useState(null);

    useEffect(() => {
        // console.log('useEffect from dashboard')
        setIsLoading(true);
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('widgetsData'));
        if(dataFromLocalStorage.length>0){
            setWidgetsData(dataFromLocalStorage);
            setIsLoading(false);
        }
    }, [])
    return (
        <div>
            { !isLoading  ? (<div className='myDashBoard_page_container'>
                <nav>
                    <h3>My dashboard</h3>
                    <Link to='/widgetsList'>
                        <button>Choose your widgets</button>
                    </Link>
                </nav>
                <div className='myDashBoard_widgets_container'>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && <BitCoinWidget widgetsData={widgetsData}/>}
                    <CryptoFiveWidget/>
                    <CovidWidget/>
                </div>
            </div>) : <div className='no_widgets_message'>No widgets...choose your widgets  <Link to='/widgetsList'> here</Link></div>}


        </div>


    );
};

export default MyDashboard;