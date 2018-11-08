
module.exports = {
    setUser: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.session)
        dbInstance.setUser(req.session.user.user_id)
        .then((user) => res.status(200).send(user))
        .catch(err => console.log(err, 'setUser error'))
    },

        update_profile: (req, res, next) => {
            const dbInstance = req.app.get('db')
            const {first_name, last_name, picture, gender, hairColor, eyeColor,  hobby, birthDay, birthMonth, birthYear} = req.body
            console.log(req.body, req.session.user.user_id)

            dbInstance.update_profile( [first_name, last_name, picture, gender, hairColor, eyeColor,  hobby, birthDay, birthMonth, birthYear, req.session.user.user_id])
            .then(() => res.status(200).send('update successful'))
        },
        my_friends: (req, res, next) => {
            const dbInstance = req.app.get('db')

            dbInstance.my_friends(req.session.user.user_id)
            .then((data) => res.status(200).send(data))
        },

        find_friends: (req, res, next) => {
            const dbInstance = req.app.get('db')
            console.log(req.session)

            dbInstance.find_friends(req.session.user.user_id, req.session.user.user_id, req.session.user.user_id)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'find friends error'))
        },
        sorted_friends: (req, res, next ) => {
            const dbInstance = req.app.get('db')

            dbInstance.sorted_friends(req.session.user.user_id)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'sort error'))
        },

        allUsers: (req, res, next) => {
            const dbInstance = req.app.get('db')
            const {user_id} = req.session.user
            dbInstance.allUsers( user_id )
            .then((friends) => res.status(200).send(friends))
            .catch(err => console.log(err, 'get friends error'))
        },
    
    add_friend: (req, res, next ) => {
        const dbInstance = req.app.get('db')
        // const {friend_id} = req.params
        console.log(req.params.id, req.session.user.user_id)

        dbInstance.add_friend(req.session.user.user_id, req.params.id)
        .then(() => res.status(200).send('friend added successfully'))
        .catch(err => console.log(err, 'error in add friend'))
    },

    first_name: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const id = `${req.params.id}%`

        dbInstance.first_name(id, id)        
        .then((user) => res.status(200).send(user))
    },
    last_name: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const id = `${req.params.id}%`

        dbInstance.last_name(id, id)        
        .then((user) => res.status(200).send(user))
        .catch(err => console.log(err, 'search error'))
    },

    delete_friend: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.delete_friend(req.session.user.user_id, req.params.id)
        .then(() => {
        dbInstance.delete_friend(req.params.id, req.session.user.user_id)
        .then(() => res.status(200).send('friend deleted'))
    })
  },
    logout: (req, res) => {
        req.session.destroy()
        console.log('session destroyed')
        res.redirect('https://helo-login.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000')
    }
}