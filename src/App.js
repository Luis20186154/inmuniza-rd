import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Error404 from './components/error/Error404';
import Home from './components/querys/Home.jsx';
import { HeaderComponent } from './components/header/Header.jsx';
import Settings from './components/settings/Settings.jsx';
import MultiStepForm from './components/forms/MultiStepForm';

function App() {
  return (
    
    <Fragment>
      <HeaderComponent/> 

      <Fragment>

        <Switch>
          <Route exact = {true} path = '/' component = {Home} />
          <Route path = '/new-register' component = {MultiStepForm} />
          <Route path = '/settings' component = {Settings} />
          <Route component = {Error404}/>
        </Switch>

      </Fragment>

    </Fragment>
    
  );
}

export default App;