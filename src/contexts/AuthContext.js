import React, {createContext, useState} from 'react';

export const AuthContext = createContext();


const AuthContextProvider = (props) => {
    const [userToken, setUserToken] = useState();
    return (
        <AuthContext.Provider value={{userToken, setUserToken}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;