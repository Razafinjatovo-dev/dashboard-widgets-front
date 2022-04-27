import React, {createContext, useState} from 'react';


export const WidgetContext = createContext();


const WidgetContextProvider = (props) => {
    const [widgetsData, setWidgetsData] = useState([]);
    return (
        <WidgetContext.Provider value={{widgetsData, setWidgetsData}}>
            {props.children}
        </WidgetContext.Provider>
    );
}

export default WidgetContextProvider