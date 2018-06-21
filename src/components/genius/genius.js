import React,{Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import { chatuser } from './../../redux/chatuser.redux';

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Genius extends Component {
    
    componentDidMount(){
        this.props.getUserList('boss')
    }

    render(){
        return <UserCard userlist={this.props.uesrlist}></UserCard>
    }

}

export default Genius