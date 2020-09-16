import React from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Loginpage from './Loginpage';
import Calendar from './Calendar';
import Meetings from './Meetings';


function App() {
    return (
        <div>
            <NavBar />
            <div className="container my-4">
                <Switch>
                    <Route path="/Home" />
                    <Route path="/calender" component={Calendar}/>
                    <Route path="/meetings" component={Meetings} />
                    <Route path="/teams"  />
                    <Route path="/login" component={Loginpage}/>
                    
                </Switch>
            </div>
        </div>
    );
}

export default App;