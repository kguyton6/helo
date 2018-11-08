import React, { Component } from 'react'
import home from './home.png'
import search from './search.png'
import './search.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchInput, { createFilter } from 'react-search-input'
import ReactPaginate from 'react-paginate'
import Pagination from './Pagination'

const KEYS_TO_FILTER = ['last_name', 'first_name']


class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allUsers: [],
            myFriends: [],
            input: '',
            dropDown: 'first',
            disabled: false,
            numberPerPage: 6,
            numberOfPages: 10,
            currentPage: 1,
            everyone: []


        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleInput = this.handleInput.bind(this)



    }
    componentDidMount() {
        axios.get('/api/findFriends')
            .then((res) => {
                this.setState({ allUsers: res.data })
            },
                axios.get('/api/friends')
                    .then((res) => {
                        this.setState({ myFriends: res.data, }, () => {
                            let everyone = this.state.allUsers.concat(this.state.myFriends)
                            this.setState({everyone: everyone})
                        })
                    },
               ))
    }

    handleDrop(value) {
        this.setState({ dropDown: value })

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
        this.setState({ input: value })
    }


    handleSearch() {
        if(this.state.dropDown !== 'last') {
        var filteredList = this.state.everyone.filter(createFilter(this.state.input, KEYS_TO_FILTER[1]))
        } else {
            var filteredList = this.state.everyone.filter(createFilter(this.state.input, KEYS_TO_FILTER[0]))
        }
        this.setState({everyone: filteredList})
    }



    reset() {
        return this.componentDidMount()
    }

    // handlePageClick = (number) => {
    //    this.setState({currentPage: number})
    // }

    

    render() {
        console.log(this.state.everyone)
        var begin = ((this.state.currentPage - 1) * this.state.numberPerPage);
        var end = begin + this.state.numberPerPage;
        var pageList = this.state.everyone.slice(begin, end);
        let users = []
         users.push(pageList.map(user => {
            return (
                <div className='friend-box2'>
                    <div className='friend-picture'>
                        {user.picture !== null ?
                            <img src={user.picture} width='100%' height='100%' />
                            : <img src='https://robohash.org/helo?bgset=bg1' alt='No Image' width='100%' height='100%' />}
                    </div>

                    <div className='add-container'>
                        {user.last_name !== null ?
                            <span className='friend-name'>{`${user.first_name} ${user.last_name}`}</span> :
                            <span className='friend-name'>{`${user.first_name}`}</span>}
                        {user.friend_id > 0 ?
                            <button onClick={() => this.removeFriend(user.user_id, user.first_name)} className='delete-friend'>Remove Friend</button> :
                            <button onClick={() => this.addFriend(user.user_id, user.first_name)} className='add-friend'>Add Friend</button>}

                    </div>
                </div>
            )
        })
        )
    
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
                        <a href='http://localhost:4800/api/logout' ><button className='logout'>Logout</button></a>
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
                        <SearchInput placeholder='Search...' className='search-input' id='SearchInput'onChange={this.searchUpdated.bind(this)} />

                        <button onClick={this.handleSearch.bind(this)} className='search-button'>Search</button>

                        <button onClick={this.reset.bind(this)} className='reset-button'>Reset</button>
                    </div>
                        {users}


                <footer><div className='buttons'> </div></footer>
                </div>
               
            </div>
        )
    }
    searchUpdated(term) {
        this.setState({ input: term })
    }

}



export default Search



