require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const ctrl = require('./controller')
const CORS = require('cors')
const axios = require('axios')

const {
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
} = process.env



massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err, 'connection error'))

app.use(bodyParser.json())
app.use(CORS())
app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false
}))
app.get('/auth/callback', async (req,res)=>{
    //code ---> req.query.code
    
    let payload =  {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri:`http://${req.headers.host}/auth/callback`
    }

    //post request with code for token
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)
    const dbInstance = req.app.get('db')
    const { sub, name, picture, email} = userRes.data
    console.log(userRes)
    let foundUser = await dbInstance.find_user([sub])
    if (foundUser[0]) {
        req.session.user = foundUser[0]
        console.log(req.session.user)
    }else {
        let createdUser = await dbInstance.create_user(sub, name, picture, email )
        req.session.user = createdUser[0]
        let createAttributes = await dbInstance.create_attributes(req.session.user.user_id)
        console.log(req.session.user.user_id)

        console.log(createAttributes)
    }
    res.redirect('/#/dashboard')

})
app.get('/api/auth/setUser', ctrl.setUser)
app.get('/api/first/:id', ctrl.first_name)
app.get('/api/last/:id', ctrl.last_name)
app.put('/api/update', ctrl.update_profile) 
app.get('/api/allUsers', ctrl.allUsers)
app.get('/api/findFriends', ctrl.find_friends) 
app.get('/api/friends', ctrl.my_friends)
app.get('/api/sort/:id', ctrl.sorted_friends) 
app.post('/api/addfriend/:id', ctrl.add_friend) 
app.post('/api/delete/:id', ctrl.delete_friend) 



const SERVER_PORT = process.env.SERVER_PORT || 4800

app.listen(SERVER_PORT, () =>  console.log(`Server Is Listening on ${SERVER_PORT}`))