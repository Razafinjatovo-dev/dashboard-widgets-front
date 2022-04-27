import React, {createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userProfile, setUserProfile] = useState();
    return (
        <UserContext.Provider value={{userProfile, setUserProfile}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider