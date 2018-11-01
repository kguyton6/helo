import React, { Component } from 'react'
import home from './home.png'
import search from './search.png'
import './dashboard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

// import {ADD_FRIEND} from '../../ducks/constants'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
            picture: '',
            user_id: null,
            name: '',
            friends: [],
            dropDown: ''

        }
        this.showFriends = this.showFriends.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.sort = this.sort.bind(this)

    }
    componentDidMount() {
        axios.get('/api/auth/setUser')
            .then((res) => {
                this.setState({
                    first_name: res.data[0].first_name,
                    last_name: res.data[0].last_name,
                    email: res.data[0].email,
                    picture: res.data[0].picture,
                    user_id: res.data[0].user_id,
                    name: res.data[0].name


                })
                axios.get(`/api/findFriends`)
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ friends: res.data })
                    })
            })
    }


    showFriends() {
        let friends = this.state.friends
        let user_id = this.state.user_id
        let friend = []
        if (this.state.friends && this.state.friends.length > 0) {
            for (let i in friends) {
                friend.push(
            
                            <div className='friend-box'>
                                <div className='friend-picture'>
                                    {friends[i].picture !== null ?
                                        <img src={friends[i].picture} width='100%' height='100%' />
                                        : <img src='https://robohash.org/profile-pic?bgset=bg1' alt='No Image' width='100%' height='100%' />}
                                </div>

                                <div className='add-container'>
                                    <span className='friend-name'>{`${friends[i].first_name} ${friends[i].last_name}`}</span>
                                    <button onClick={() => this.addFriend(friends[i].user_id)} className='add-friend'>Add Friend</button>

                                </div>
                    </div>
                )
            }

        }

        return friend
    }


    addFriend(friendId) {
        console.log(friendId)
        axios.post(`/api/addfriend/${friendId}`)
            .then((res) => {
                if (res.status === 200) {
                    alert(`${this.state.name} you successfully added a new friend`)
                }

                return this.componentDidMount()
            })
    }
    sort(value){
        this.setState({dropDown: value})
        console.log(value)
        let friends = this.state.friends
        let newFriendList = []      
        for(let i = 0; i < friends.length; i++){
            console.log(friends)
            if(this.state.dropdown === 'last_name'){
                friends.sort(function(a, b){
                    if(a.first_name < b.first_name){
                        return -1
                    }
                    if(a.first_name > b.first_name){
                        return 1
                    }
                })
                return 0

            }
                    return newFriendList
            } 
         
    }
    render() {

        return (
            <div className='Dashboard'>
                <div className='header'>
                    <div className='head-nav-container'>
                        <div className='nav1-container'>
                            <span className='nav1'>Helo</span>
                            <Link to='/dashboard'><img className='icons' src={home} alt='home' /></Link>
                            <Link to='/search'><img className='icons'
                                src={search} alt='search' /></Link>
                        </div>
                        <span className='nav2'>Dashboard</span>
                        <Link to='https://helo-login/v2/logout'><span className='nav3'>Logout</span></Link>
                    </div>
                </div>
                <div className='empty'></div>
                <div className='main-container'>
                    <div className='top-container'>
                        <div className='left-box'>
                            <div className='profile-picture-box'><img src={this.state.picture} width='100%' height='100%' alt='' /></div>
                            <div className='left-box-right'>
                                <span className='profile-name'>{`${this.state.first_name} ${this.state.last_name}`}</span>
                                <Link to='/profile'><button className='edit-profile'>Edit Profile</button></Link> </div>
                        </div>

                        <div className='right-box'>
                            <p className='welcome'>
                                Welcome to Helo!  Find recommended friends based of your similarities, and even search for them by name.  The more you update your profile, the better recommendations we can make!</p></div>
                    </div>
                    <div className='main-box'>
                        <div className='top-mainbox'>
                        { this.state.user_id !== null || this.state.value !== null ?
                            <span className='recommend'>
                                Recommended Friends
            </span> :
             <span className='recommend'>
             No Recommendations
                        </span>  }

                            <div className='dropdown-container'>
                                Sort By <br />
                                <select className='sort-dropdown' onChange={(e) => this.sort(e.target.value)}>
                                    <option value='first_name'>First Name</option>
                                    <option value='last_name'>Last Name</option>
                                    <option value='gender'>Gender</option>
                                </select>
                            </div>
                        </div>
                        {this.showFriends()}

                    </div>
                </div>
            </div>

        )
    }
}

// function mapStateToProps(state) {
//     return {
//         first_name: state.first_name,
//         last_name: state.last_name,
//         picture: state.picture,

//     }
// }

// export const mapDispatchToProps = dispatch => {
//     return {
//     addFirst: first_name => dispatch({ type: ADD_FIRSTNAME, payload: first_name}),
//     addLast: last_name => dispatch({ type: ADD_LASTNAME, payload: last_name}),

//     }
// }

export default Dashboard