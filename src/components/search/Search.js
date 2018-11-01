import React, { Component } from 'react'
import home from './home.png'
import search from './search.png'
import './search.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import Pagination from "react-js-pagination";



class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allUsers: [],
            myFriends: [],
            input: '',
            dropDown: '',
        


        }
        this.reset = this.reset.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

    }
    componentDidMount() {
        axios.get('/api/allUsers')
            .then((res) => {
                this.setState({
                    allUsers: res.data
                })
            },
                axios.get('/api/friends')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ myFriends: res.data })
                    })
            )
       
    }

    showFriends() {
        let myFriends = this.state.myFriends
        let friend = []
        if (this.state.myFriends && this.state.myFriends.length > 0) {
            for (let i in myFriends) {
                console.log(myFriends)
                friend.push(
                    <div className='friend-box2'>
                        <div className='friend-picture'>
                            {myFriends[i].picture !== null ?
                                <img src={myFriends[i].picture} width='100%' height='100%' />
                                : <img src='https://robohash.org/helo?bgset=bg1' alt='No Image' width='100%' height='100%' />}
                        </div>

                        <div className='add-container'>
                            <span className='friend-name'>{`${myFriends[i].first_name} ${myFriends[i].last_name}`}</span>
                            <button onClick={() => this.removeFriend(myFriends[i].user_id, myFriends[i].first_name)} className='delete-friend'>Remove Friend</button>

                        </div>
                    </div>
                )
            }

            return friend
        }
    }

    showUsers() {
        console.log(this.state.allUsers)
        let allUsers = this.state.allUsers
        let users = []
        if (this.state.allUsers && this.state.allUsers.length > 0) {
            for (let i in allUsers) {
                console.log(allUsers[i])
                users.push(
                    <div className='friend-box2'>
                        <div className='friend-picture'>
                            {allUsers[i].picture !== null ?
                                <img src={allUsers[i].picture} width='100%' height='100%' />
                                : <img src='https://robohash.org/helo?bgset=bg1' alt='No Image' width='100%' height='100%' />}
                        </div>

                        <div className='add-container'>
                            <span className='friend-name'>{`${allUsers[i].first_name} ${allUsers[i].last_name}`}</span>
                            <button onClick={() => this.addFriend(allUsers[i].user_id, allUsers[i].first_name)} className='add-friend'>Add Friend</button>

                        </div>
                    </div>

                )
            }

        }

        return users
    }



    removeFriend(friendId, name) {
        axios.post(`/api/delete/${friendId}`)
            .then((res) => {
                if (res.status === 200) {
                    alert(`You and ${name} are no longer friends`)
                }
                return this.componentDidMount()
            })
    }

    addFriend(friendId, name) {
        console.log(friendId)
        axios.post(`/api/addfriend/${friendId}`)
            .then((res) => {
                if (res.status === 200) {
                    alert(`You and ${name} are now friends!`)
                }

                return this.componentDidMount()
            })
    }
    handleInput(value) {
       this.setState({input: value})
       
    }

    
   handleDrop(value){
        this.setState({ dropDown: value})

   }
  
    handleSearch(value){
        if(this.state.dropDown === 'last'){
        axios.get(`/api/last/${value}`)
        .then((res) => {
            this.setState({
                allUsers: res.data,
                myFriends: null
            })
        })
        } else {
            axios.get(`/api/first/${value}`)
            .then((res) => {
                this.setState({
                    allUsers: res.data,
                    myFriends: null
                })
            })
        }
    }
    reset() {
        this.setState({ input: '' })
        return this.componentDidMount()
    }

    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({ activePage: pageNumber });
    // }

    render() {

        return (
            <div className='Search'>
                <div className='header'>
                    <div className='head-nav-container'>
                        <div className='nav1-container'>
                            <span className='nav1'>Helo</span>
                            <Link to='/dashboard'> <img className='icons' src={home} alt='home' /></Link>
                            <Link to='/search'><img className='icons'
                                src={search} alt='search' /></Link>
                        </div>
                        <span className='nav2'>Search</span>
                        <Link to='/'><span className='nav3'>Logout</span></Link>
                    </div>
                </div>
                <div className='space'></div>
                <div className='main-search'>
                    <div className='top-box'>
                        <div className='dropdown-container'>
                            <select onChange={(e) => this.handleDrop(e.target.value)} className='search-dropdown'>
                                <option value='first'>First Name</option>
                                <option value='last'>Last Name</option>
                            </select>
                        </div>
                        <input onChange={(e) => this.handleInput(e.target.value)} placeholder=' Search..' className='search-input' />
                        <button onClick={() => this.handleSearch(this.state.input)} className='search-button'>Search</button>
                        <button onClick={this.reset} className='reset-button'>Reset</button>
                    </div>

                    {this.showFriends()}
                    {this.showUsers()}
                    
                </div>
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        first_name: state.first_name,
        picture: state.picture,
        friendId: state.friendId,


    }
}

// export const mapDispatchToProps = dispatch => {
//     return {
//     addFriend: friendId => dispatch({ type: ADD_FRIEND, payload: friendId}) 
//     }
// }

export default connect(mapStateToProps)(Search)



