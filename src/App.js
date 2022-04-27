import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomePage from "./views/HomePage";
import React, {useContext, useEffect, useState} from "react";
import Register from "./views/Register";
import NavBar from "./components/NavBar";
import AdminPage from "./views/AdminPage";
import LoginPage from "./views/LoginPage";
import Logout from "./views/Logout";
import MyDashboard from "./views/MyDashboard";
import NotFound from "./views/NotFound";
import AuthContextProvider from "./contexts/AuthContext";
import Cookies from 'js-cookie';
import WidgetContextProvider, {WidgetContext} from "./contexts/WidgetContext";
import ChooseWidgets from "./views/ChooseWidgets";
import UserContextProvider from "./contexts/UserContext";

function App() {
    const [userToken, setUserToken] = useState('');
    useEffect(() => {
        setUserToken(Cookies.get('userToken'));
    }, [])
    return (
        <div className="App">
            <Router>
                <UserContextProvider>
                    <AuthContextProvider>
                        <WidgetContextProvider>
                            <NavBar userToken={userToken} setUserToken={setUserToken}/>
                            <Switch>
                                <Route exact path='/' component={HomePage}/>
                                <Route path='/register' component={Register}/>
                                <Route path='/admin' component={AdminPage}/>
                                <Route path='/login'
                                       component={() => <LoginPage userToken={userToken}
                                                                   setUserToken={setUserToken}/>}/>
                                <Route path='/logout'
                                       component={() =>
                                           <Logout userToken={userToken} setUserToken={setUserToken}/>
                                       }/>
                                <Route path='/myDashboard' component={MyDashboard}/>
                                <Route path='/widgetsList' component={ChooseWidgets}/>
                                <Route path='*' component={NotFound}/>
                            </Switch>
                        </WidgetContextProvider>
                    </AuthContextProvider>
                </UserContextProvider>
            </Router>
        </div>
    );
}

export default App;
