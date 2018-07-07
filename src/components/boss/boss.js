import React,{Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { WhiteSpace,Card,WingBlank } from 'antd-mobile';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from './../usercard/usercard';

@connect(
    state=>state.chatuser,
    { getUserList }
)

class Boss extends Component {
  
    componentDidMount(){
        this.props.getUserList('genius')
    }

    render(){
        const Header = Card.Header
        const Body = Card.Body
        return <UserCard userlist={this.props.uesrlist}></UserCard>
    }

}



export default Boss