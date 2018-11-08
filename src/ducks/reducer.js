import axios from 'axios';

// Set up initial state
const initialState = {
    userInfo: {},
    nonFriends: {},
    friends: {}

};

// action types
const GET_USER_INFO = 'GET_USER_INFO';
const GET_NON_FRIENDS = 'GET_NON_FRIENDS'
const GET_FRIENDS = 'GET_FRIENDS'


// action creators
export function getUserInfo() {
    const userInfo = axios.get('/api/auth/setUser').then( res => {
        console.log(res.data)
        return res.data
    })
    return {
        type: GET_USER_INFO,
        payload: userInfo
    }
}

export function getNonFriends() {
    const nonFriendsInfo = axios.get('/api/findFriends').then( res => {
        console.log(res.data)
        return res.data
    })
    return {
        type: GET_NON_FRIENDS,
        payload: nonFriendsInfo
    }
}

export function getFriends() {
    const friendsInfo = axios.get('/api/friends').then( res => {
        return res.data
    })
    return {
        type: GET_FRIENDS,
        payload: friendsInfo
    }
}

// reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
        return Object.assign({}, state, { user: action.payload })

        case GET_NON_FRIENDS:
            return Object.assign({}, state, { nonFriends: action.payload })
        case GET_FRIENDS:
            return Object.assign({}, state, { friends: action.payload })
        default:
            return state;
    }

}
