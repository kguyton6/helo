import React, { Component } from 'react'
import './auth.css'
import logo from './logo.png'

class Auth extends Component {
    constructor(props){
        super(props)

        this.login = this.login.bind(this)
    }    

    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env
        //url = 'http://localhost:3000/auth/callback'
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    

    render(){
        return(
            <div className='Login'>
            <div className='main-container'>
            <div className='login-container'>
            <img className='login-logo'src={logo} alt='logo'/>
            <span className='helo' >Helo</span>
            <button onClick={this.login}className='login'>Login/Register</button>
            </div>
            
            </div>
            </div>
        )
    }
}

export default Auth

const webAuth = new auth0.WebAuth({
    domain:       'YOUR_AUTH0_DOMAIN',
    clientID:     'YOUR_CLIENT_ID'
  });
  
  webAuth.signup({ 
    connection: 'CONNECTION', 
    email: 'EMAIL', 
    password: 'PASSWORD',
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) { 
    if (err) return alert('Something went wrong: ' + err.message); 
      return alert('success signup without login!') 
  });