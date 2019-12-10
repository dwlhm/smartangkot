import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Peta from './Peta/Peta';
import Akun from './Akun/Akun';
import Informasi from './Informasi/Informasi';
import Jemput from './Jemput/Jemput';
import './App.css';

function App() {
  return (
    <div className="App">
    	<Router>
    		<Route exact path="/" component={Peta} />
            	<Route path="/profil/" component={Akun} />
            	<Route path="/lapor/" component={Informasi} />
            	<Route path="/jemput/:metode/:latitude/:longitude/:angkotId/:nama/:token" component={Jemput} />
     	</Router>
    </div>
  );
}

export default App;
