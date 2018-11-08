import React, { Component } from 'react'
import home from './home.png'
import search from './search.png'
import './profile.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import{ addFirst, addLast, addGender, addHairColor, addEyeColor, addBirthDay, addBirthMonth, addBirthYear, addHobby } from '../../ducks/reducer'
// import { ADD_NEW, ADD_FIRSTNAME, ADD_LASTNAME, ADD_GENDER, ADD_HAIRCOLOR, ADD_EYECOLOR, ADD_HOBBY, ADD_BIRTHDAY, ADD_BIRTHMONTH, ADD_BIRTHYEAR } from '../../ducks/constants'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            picture: '',
            first_name: '',
            last_name: '',
            gender: 'Select', 
            hairColor: 'Select',
            eyeColor:'Select', 
            hobby: 'Select', 
            birthDay: 'Select', 
            birthMonth: 'Select', 
            birthYear: 'Select',
            input: '',
            edit: false,

        }
        this.update = this.update.bind(this)
        this.updatePicture = this.updatePicture.bind(this)
        this.pictureUrl = this.pictureUrl.bind(this)
        this.edit = this.edit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get('/api/auth/setUser')
            .then((res) => {
                this.setState({
                    user_id: res.data[0].user_id,
                    first_name: res.data[0].first_name,
                    last_name: res.data[0].last_name,
                    picture: res.data[0].picture,
                    gender: res.data[0].gender,
                    hairColor: res.data[0].hair_color,
                    eyeColor: res.data[0].eye_color,
                    hobby: res.data[0].hobby,
                    birthDay: res.data[0].birthday,
                    birthMonth: res.data[0].birthmonth,
                    birthYear: res.data[0].birthyear
                })

            })
    }


    
    update() {
        let { picture, first_name, last_name, gender, hairColor, eyeColor, hobby, birthMonth, birthYear, birthDay } = this.state
        console.log(this.state)
        axios.put(`/api/update`,
        { picture, first_name, last_name, gender, hairColor, eyeColor, hobby, birthMonth, birthYear, birthDay })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    alert('Update Successful')
                    this.props.history.push('/dashboard')
                }

            }).catch(err => console.log(err, 'update error'))
           

    }

    addFirst(value){
        this.setState({first_name: value})
    }

    addLast(value){  
        this.setState({last_name: value})
    }
    addGender(value){
        this.setState({gender: value})
    }
    addHairColor(value){
        this.setState({hairColor: value})
    }
    addEyeColor(value){
        this.setState({eyeColor: value})
    }
    addHobby(value){
        this.setState({hobby: value})
    }
    addBirthDay(value){
        this.setState({birthDay: value })
    }
    addBirthMonth(value){
        this.setState({birthMonth: value})
    }
    addBirthYear(value){
        this.setState({birthYear: value})
    }
    updatePicture(){
        this.setState({edit: true})
    }

    pictureUrl(value){
        this.setState({picture: value,
                        edit: false})
    }
    edit(){
        return <button>Edit</button>
    }
    
    render() {
        console.log(this.props.picture)
        console.log(this.state)
        return (
            <div className='Dashboard-1'>
                <div className='header'>
                    <div className='head-nav-container'>
                        <div className='profile-nav1-container'>
                            <span className='nav1'>Helo</span>
                            <div className='icons'>
                                <Link to='/dashboard'><img className='house-icon' src={home} alt='home' /></Link></div>
                            <div>
                                <Link to='/search'><img className='search-icon' src={search} alt='search' /></Link>  </div>
                        </div>
                        <span className='nav2'>Profile</span>
                        <a to='http://localhost:4800/api/logout' ><button className='logout'>Logout</button></a>
                    </div>
                </div>
                <div className='empty1'></div>
                <div className='main-container-1'>
                    <div className='top-container-1'>
                        <div className='left-box-1'>
                            <div className='profile-picture-box-1'><img src={this.state.picture} width='100%' height='100%' alt='' />
                            {this.state.edit === false ?
                            <button className='edit' onMouseOver={this.updatePicture}>edit</button> :
                            <input className='edit-input' onChange={(e) => this.pictureUrl(e.target.value)}/> }
                            </div> 

                            <div className='top-box-middle-1'>
                            {this.state.last_name !== null ?
                                <span className='profile-name-1'>{`${this.state.first_name} ${this.state.last_name}`}</span>:
                            <span className='profile-name-1'>{`${this.state.first_name}`}</span> }
                            </div>
                            <div className='top-box-right-1'>
                                <button onClick={this.update} className='update'>Update</button>
                                <Link to='/dashboard' className='cancel-box'><button className='cancel'>Cancel</button></Link>
                            </div>
                        </div>
                    </div>

                    <div className='main-box-1'>
                        <div className='main-leftside'>
                            <div className='input-container'>
                                First Name
                      <input type='text' value={this.state.first_name} onChange={(e) => this.addFirst(e.target.value)} className='left-input' /></div>
                            <div className='input-container'>
                                Last Name
                      <input type='text' value={this.state.last_name} onChange={(e) => this.addLast(e.target.value)} className='left-input' />
                            </div>
                            <div className='dropdown-left'>
                                Gender
                            <select className='gender' onChange={(e) => this.addGender(e.target.value)}>
                            {}
                                    <option value={this.state.gender}>{this.state.gender}</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='undecided'>Undecided</option>
                                </select></div>
                            <div className='dropdown-left'>
                                Hair Color
                            <select className='haircolor' onChange={(e) => this.addHairColor(e.target.value)}>
                                    <option value={this.state.hairColor}>{this.state.hairColor}</option>
                                    <option value='Brown'>Brown</option>
                                    <option value='Black'>Black</option>
                                    <option value='Blonde'>Blonde</option>
                                    <option value='Red'>Red</option>
                                    <option value='Gray'>Gray</option>
                                    <option value='White'>White</option>
                                    <option value='none'>None of these</option>
                                </select></div>
                            <div className='dropdown-left'>
                                Eye Color
                            <select className='eyecolor' onChange={(e) => this.addEyeColor(e.target.value)}>
                                    <option value={this.state.eyeColor}>{this.state.eyeColor}</option>
                                    <option value='Brown'>Brown</option>
                                    <option value='Green'>Green</option>
                                    <option value='Blue'>Blue</option>
                                </select>
                            </div>
                        </div>

                        <div className='main-right'>
                            <div className='dropdown-right'>
                                Hobby

                                    <select className='hobby' onChange={(e) => this.addHobby(e.target.value)}>
                                        <option value={this.state.hobby}>{this.state.hobby}</option>
                                        <option value='Soccer'>Soccer</option>
                                        <option value='Football'>Football</option>
                                        <option value='Baseball'>Baseball</option>
                                        <option value='Snowboard'>Snowboard</option>
                                        <option value='Wakeboard'>WakeBoard</option>
                                        <option value='Garden'>Garden</option>
                                        <option value='Read'>Read</option>
                                        <option value='Exercise'>Exercise</option>
                                      </select>
                            </div>

                            <div className='dropdown-right'>
                                Birth Month
                            <select className='birthmonth' onChange={(e) => this.addBirthMonth(e.target.value)}>
                                    <option value={this.state.birthMonth} >{this.state.birthMonth}</option>
                                    <option value='January'>January</option>
                                    <option value='Febuary'>February</option>
                                    <option value='March'>March</option>
                                    <option value='April'>April</option>
                                    <option value='May'>May</option>
                                    <option value='June'>June</option>
                                    <option value='July'>July</option>
                                    <option value='August'>August</option>
                                    <option value='September'>September</option>
                                    <option value='October'>October</option>
                                    <option value='November'>November</option>
                                    <option value='December'>December</option>
                                </select></div>
                            <div className='dropdown-right'>
                                Birthday Day
                            <select className='birthday' onChange={(e) => this.addBirthDay(e.target.value)}>
                                    <option value={this.state.birthDay}>{this.state.birthDay}</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                    <option value='13'>13</option>
                                    <option value='14'>14</option>
                                    <option value='15'>15</option>
                                    <option value='16'>16</option>
                                    <option value='17'>17</option>
                                    <option value='18'>18</option>
                                </select></div>
                            <div className='dropdown-right'>
                                Birth Year
                            <select className='birthyear' onChange={(e) => this.addBirthYear(e.target.value)}>
                                    <option value={this.state.birthYear}>{this.state.birthYear}</option>
                                    <option value='1948'>1948</option>
                                    <option value='1984'>1984</option>
                                    <option value='1985'>1985</option>
                                    <option value='1986'>1986</option>
                                    <option value='1987'>1987</option>
                                    <option value='1988'>1988</option>
                                    <option value='1989'>1989</option>
                                    <option value='1990'>1990</option>
                                    <option value='2006'>2006</option>
                                    <option value='2007'>2007</option>
                                    <option value='2008'>2008</option>
                                    <option value='2009'>2009</option>
                                    <option value='2010'>2010</option>

                                </select>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateTostate(state) {
    return {
        first_name: state.first_name,
        last_name: state.last_name,
        gender: state.gender,
        hairColor: state.hairColor,
        eyeColor: state.eyeColor,
        hobby: state.hobby,
        birthDay: state.birthDay,
        birthMonth: state.birthMonth,
        birthYear: state.birthYear,
        picture: state.picture,
        newHobby: state.newHobby
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFirst: first_name => dispatch({ type: 'ADD_FIRSTNAME', payload: first_name }),
        addLast: last_name => dispatch({ type: 'ADD_LASTNAME', payload: last_name }),
        addGender: gender => dispatch({ type: 'ADD_GENDER', payload: gender }),
        addHairColor: hairColor => dispatch({ type: 'ADD_HAIRCOLOR', payload: hairColor }),
        addEyeColor: eyeColor => dispatch({ type: 'ADD_EYECOLOR', payload: eyeColor }),
        addHobby: hobby => dispatch({ type: 'ADD_HOBBY', payload: hobby }),
        addBirthDay: birthDay => dispatch({ type: 'ADD_BIRTHDAY', payload: birthDay }),
        addBirthMonth: birthMonth => dispatch({ type: 'ADD_BIRTHMONTH', payload: birthMonth }),
        addBirthYear: birthYear => dispatch({ type: 'ADD_BIRTHYEAR', payload: birthYear })
    }
}

export default connect(mapStateTostate, mapDispatchToProps )(Profile)




