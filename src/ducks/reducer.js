import {ADD_BIRTHDAY,ADD_BIRTHYEAR,ADD_BIRTHMONTH,ADD_EYECOLOR,ADD_FIRSTNAME,ADD_GENDER,ADD_HAIRCOLOR,ADD_LASTNAME, ADD_HOBBY, ADD_NEW, ADD_FRIEND} from './constants'
import { finished } from 'stream';



const initialState = {
    first_name: '',
    last_name:'',
    gender:'',
    hairColor:'',
    eyeColor:'',
    hobby:'',
    birthDay: null,
    birthMonth: null,
    birthYear: null,
    newHobby: '',
    friendId: null
}

const reducer = (state = initialState, action) => {
    console.log('Reducer hit: Action ---->', action)
    switch (action.type){
        case ADD_FIRSTNAME:
        Object.assign({}, state, { first_name: action.payload})

        case ADD_LASTNAME:
        Object.assign({}, state, { last_name: action.payload })

        case ADD_GENDER:
        Object.assign({}, state, { gender: action.payload })

        case ADD_HAIRCOLOR:
        Object.assign({}, state, { hairColor: action.payload })

        case ADD_EYECOLOR:
        Object.assign({}, state, { eyeColor: action.payload })

        case ADD_HOBBY:
        Object.assign({}, state, { hobby: action.payload })

        case ADD_BIRTHDAY:
        Object.assign({}, state, { birthDay: action.payload })

        case ADD_BIRTHMONTH:
        Object.assign({}, state, { birthMonth: action.payload })

        case ADD_BIRTHYEAR:
        Object.assign({}, state, { birthYear: action.payload })

        case ADD_NEW:
        Object.assign({}, state, {newHobby: action.payload})

        case ADD_FRIEND:
        Object.assign({}, state, {friendId: action.payload})
        default: return state

    }
       
}

export const addFirst = first_name => ({type: ADD_FIRSTNAME, payload: first_name})
export const addLast = last_name => ({type: ADD_LASTNAME, payload: last_name})
export const addBirthDay = birthday => ({type: ADD_BIRTHDAY, payload: birthday})
export const addBirthMonth = birthMonth => ({type: ADD_BIRTHMONTH, payload: birthMonth})
export const addBirthYear = birthYear => ({type: ADD_BIRTHYEAR, payload: birthYear})
export const addGender = gender => ({type: ADD_GENDER, payload: gender})
export const addHairColor = hairColor => ({type: ADD_HAIRCOLOR, payload: hairColor})
export const addEyeColor = eyeColor => ({type: ADD_EYECOLOR, payload: eyeColor})
export const addHobby = hobby => ({type: ADD_HOBBY, payload: hobby})
export const addNew = newHobby => ({type: ADD_NEW, payload: newHobby})
export const addFriend = friendId => ({type: ADD_FRIEND, payload: friendId})
export default reducer