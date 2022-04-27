import React, {useEffect, useState} from 'react';
import {Chart} from 'chart.js/auto'
import BarChart from "./BarChart";
import {Link} from "react-router-dom";

const CryptoFiveWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [thisWidgetData, setThisWidgetData] = useState([]);
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        function getWidgetsDataFromLocalStorage() {
            setIsLoading(true);
            const data = JSON.parse(localStorage.getItem('widgetsData'));
            //check with widgetsData empty array
            if (data.length > 0) {
                data.forEach(d => {
                    if (d.widget_name === '5 crypto currencies values') {
                        setChartData(
                            {
                                labels: d.data.data.map((crypto) => crypto.name), // return ['bitcoin', 'ethereum',...]
                                datasets: [
                                    {
                                        label: "Price in USD",
                                        data: d.data.data.map((crypto) => crypto.priceUsd),
                                        backgroundColor: [
                                            "#ffbb11",
                                            "#ecf0f1",
                                            "#50AF95",
                                            "#f3ba2f",
                                            "#2a71d0"
                                        ]
                                    }
                                ]

                            }
                        );
                    }
                });
                setIsLoading(false);
            }

        };
        getWidgetsDataFromLocalStorage();
    }, [])

    return (
        <>
            {chartData && (<div className='fiveCrypto_widget_container'>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                <div>
                    <BarChart chartData={chartData}/>
                </div>}
            </div>)}
        </>

    );
};

export default CryptoFiveWidget;