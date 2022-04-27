import React, {useEffect, useState} from 'react';

const CovidWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [thisWidgetData, setThisWidgetData] = useState(null);

    useEffect(() => {
        function getWidgetsDataFromLocalStorage() {
            setIsLoading(true);
            const data = JSON.parse(localStorage.getItem('widgetsData'));
            //check with widgetsData empty array
            if (data.length > 0) {
                data.forEach(d => {
                    if (d.widget_name === 'Covid 19 stats France') {
                        setThisWidgetData(d);
                    }
                });
                setIsLoading(false);
            }
        };
        getWidgetsDataFromLocalStorage();
    }, []);

    return (
        <>
            {isLoading ? <div>Loading...</div> : (
                <div>
                    {thisWidgetData &&
                        (<div className='covid_widget_container'>
                                <div>FRANCE Covid 19 stats - date: {thisWidgetData.data[0].date} </div>
                                <div className='unitInfos_wrapper' >
                                    <div className='unitInfo'>
                                        <p>HOSPITAL</p>
                                        <p>{thisWidgetData.data[0].hosp}</p>
                                    </div>
                                    <div className='unitInfo'>
                                        <p>CRITICAL</p>
                                        <p>{thisWidgetData.data[0].rea}</p>
                                    </div>
                                    <div className='unitInfo'>
                                        <p>CUMUL CONFIRMED</p>
                                        <p>{thisWidgetData.data[0].conf}</p>
                                    </div>
                                    <div className='unitInfo'>
                                        <p>CUMUL DEATHS</p>
                                        <p>{thisWidgetData.data[0].dc_tot}</p>
                                    </div>
                                </div>
                            </div>
                        ) }
                </div>
            )}
        </>

    );
};

export default CovidWidget;