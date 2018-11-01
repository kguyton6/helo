import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import Search from './components/search/Search'

class App extends Component {
  render() {
    return (
     <div className='App'>
     <Router>
       <Switch>
         <Route exact path = '/' component={Login}/>
         <Route exact path='/dashboard' component={Dashboard} />
         <Route exact path='/profile' component={Profile}/>
         <Route exact path='/search' component={Search}/>
       </Switch>
     </Router>
     </div>
    );
  }
}

export default App;
