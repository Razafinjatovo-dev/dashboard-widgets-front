import React, {useContext, useEffect, useState} from 'react';


const BitCoinWidget = ({widgetsData}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
            <div>
                {widgetsData.map(w => {
                    if (w.widget_name === 'bitcoin') {
                        return (
                            <div key={w.widget_id} className='crypto_widget_wrapper'>
                                <h3>Bitcoin value</h3>
                                <p>{w.data.disclaimer}</p>
                                <ul>
                                    <li>{w.data.bpi.EUR.description}: {w.data.bpi.EUR.rate} </li>
                                    <li>{w.data.bpi.USD.description}: {w.data.bpi.USD.rate} </li>
                                    <li>{w.data.bpi.GBP.description}: {w.data.bpi.GBP.rate} </li>
                                    <li>Time: {w.data.time.updated}</li>
                                </ul>

                            </div>
                        )
                    }
                })}
            </div>}


        </div>
    );
};

export default BitCoinWidget;