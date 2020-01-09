import './App.css';

import {Route, Switch} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import React from 'react';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <div >
    <Header />
    <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/shop' component={ShopPage} />
    <Route exact path='/sign-in' component={SignInAndSignUpPage} />
    </Switch>
   
    </div>
  );
}

export default App;
