import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Cookies from 'js-cookie';
import {DB_URI} from "../conf/conf";

const ChooseWidgets = () => {
    document.querySelector('title').innerText = 'Widgets List';
    const history = useHistory();
    const [userToken, setUserToken] = useState('');
    const [userProfile, setUserProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [widgetsList, setWidgetsList] = useState([]);
    const [crypto, setCrypto] = useState([]);
    const [weather, setWeather] = useState([]);
    const [randomActivity, setRandomActivity] = useState([]);
    const [covidFranceStats, setCovidFranceStats] = useState([]);
    const [news, setNews] = useState([]);
    const [selectedWidgets, setSelectedWidgets] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const userInfosFromLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
        setUserProfile(userInfosFromLocalStorage);
        const userTokenFromCookies = Cookies.get('userToken');
        setUserToken(userTokenFromCookies);
        setIsLoading(false);
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const fetchAllWidgets = async () => {
            try {
                // console.log('fetching widgets data from db');
                const response = await fetch(`${DB_URI}/widgets`);
                if (response.ok && response.status === 200) {
                    const data = await response.json();
                    setWidgetsList(data);

                    if (data.length > 0) {
                        data.forEach(widget => {
                            if (widget.service.name === 'Crypto') {
                                setCrypto(crypto => [...crypto, widget]);
                            } else if (widget.service.name === 'Weather') {
                                setWeather(weather => [...weather, widget])
                            } else if (widget.service.name === 'News') {
                                setNews(news => [...news, widget])
                            } else if (widget.service.name === 'Leisure') {
                                setRandomActivity(randomActivity => [...randomActivity, widget])
                            } else if (widget.service.name === 'Health') {
                                setCovidFranceStats(covidFranceStats => [...covidFranceStats, widget])
                            }
                        });
                    }


                    setIsLoading(false);
                } else {
                    // setIsLoading(false);
                    alert('Error fetching Services & Widgets List');
                }
            } catch (e) {
                // setIsLoading(false);
                alert('Error fetching Services & Widgets List');
            }
        };
        fetchAllWidgets();
    }, [])

    const handleTickBox = (e) => {
        setSelectedWidgets([...selectedWidgets, e.target.value])
        // console.log('box checked')
    }

    const handleSubscribeWidgets = async () => {
        //STEP 1 Update user's widgetsList in db
        const userId = userProfile._id;
        const endPointUserUpdate = `${DB_URI}/users/${userId}`;
        const requestBody = {
            // email: userProfile.user.email,
            // username: userProfile.user.username,
            widgetsList: selectedWidgets
        };

        const init = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        };
        try {
            const response = await fetch(endPointUserUpdate, init);
            const data = await response.json();

            //STEP 2 once user updated in db,  fetch user widgets updated from db
            const fetchWidgetsUpdatedResponse = await fetch(`${DB_URI}/widgets/userWidgets/${userProfile._id}`);
            const updatedWidgetsData = await fetchWidgetsUpdatedResponse.json();

            //STEP 3 update widgetsData in local storage
            localStorage.setItem('widgetsData', JSON.stringify(updatedWidgetsData.widgetsData));
            history.push('/myDashboard');

        } catch (e) {
            console.log(e)
        }
    }

    return (

        <div className='widgetsList_page-container'>
            <h2>Choose your widgets here</h2>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
            <div>
                {/*CRYPTO SERVICE - START*/}
                {crypto.length > 0 &&
                (<div>
                    <h1>Service - {crypto[0].service.name}</h1>
                    {crypto.map(c => {
                        return (
                            <div key={c._id}>
                                <input type='checkbox' value={c._id} onChange={handleTickBox}/>
                                <label>{c.description}</label>
                            </div>
                        )
                    })}
                    <hr/>
                </div>)}
                {/*CRYPTO SERVICE - END */}

                {/*HEALTH SERVICE START */}
                <div>

                </div>
                {covidFranceStats.length > 0 && (<div>
                    <h1>Service - {covidFranceStats[0].service.name}</h1>
                    {covidFranceStats.map(c => {
                        return (
                            <div key={c._id}>
                                <input type='checkbox' value={c._id} onChange={handleTickBox}/>
                                <label>{c.description}</label>
                            </div>
                        )
                    })}
                    <hr/>
                </div>)
                }
                {/*HEALTH SERVICE END*/}

            </div>}
            <button onClick={handleSubscribeWidgets}>Subscribe</button>
        </div>
    );
};

export default ChooseWidgets;


