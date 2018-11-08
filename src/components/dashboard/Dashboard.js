import React, { Component } from 'react'
import home from './home.png'
import search from './search.png'
import './dashboard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from '../search/Search'
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
            dropDown: '',
            sortedFriends: []

        }
        this.showFriends = this.showFriends.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSort = this.handleSort.bind(this)


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
                                {friends[i].last_name !== null ?
                                    <span className='friend-name'>{`${friends[i].first_name} ${friends[i].last_name}`}</span> :
                                <span className='friend-name'>{`${friends[i].first_name}`}</span> }
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
    handleSort(value){
        console.log(value)
        this.setState({dropDown: value },
        () => {
            let friends = this.state.friends
            let compare = (a, b) => {
                const nameA = a[this.state.dropDown]
                const nameB = b[this.state.dropDown]
                console.log(nameA, nameB)
                
                    if(nameA < nameB ){
                        return -1
                    }
                    if(nameA > nameB){
                        return 1
                    } 
                  }
                  if(this.state.dropDown){
                      console.log(this.state.dropDown)
                      let sortedFriends = friends.sort(compare)
                      this.setState({sortedFriends})
                  } else {
                      this.setState({sortedFriends: []})
                  }
                })
                
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
                        <a href='http://localhost:4800/api/logout'className='nav3' ><button className='logout'>Logout</button></a> 
                    </div>
                </div> 
                <div className='empty'></div>
                <div className='main-container'>
                    <div className='top-container'>
                        <div className='left-box'>
                            <div className='profile-picture-box'><img src={this.state.picture} width='100%' height='100%' alt='' /></div>
                            <div className='left-box-right'>
                            { this.state.last_name !== null ?
                                <span className='profile-name'>{`${this.state.first_name} ${this.state.last_name}`}</span>:
                            <span className='friend-name'>{`${this.state.first_name}`}</span> }
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
                                <select onChange={(e) => this.handleSort(e.target.value)} className='sort-dropdown'>
                                    <option>Choose One</option>
                                    <option value='first_name'>First Name</option>
                                    <option value='last_name'>Last Name</option>

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


export default Dashboard