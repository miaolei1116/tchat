import React,{Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { WhiteSpace,Card,WingBlank } from 'antd-mobile';

import { getUserList } from '../../redux/chatuser.redux'
import { chatuser } from './../../redux/chatuser.redux';

@connect(
    state=>state.chatuser,
    { getUserList }
)

class Boss extends Component {
  
    componentDidMount(){
        this.props.getUserList('genius')
    }

    render(){
        console.log(this.state)
        const Header = Card.Header
        const Body = Card.Body
        return (
        <WingBlank>
            <WhiteSpace></WhiteSpace>
            {this.props.userlist.map(v=>(
                v.headerpic?<Card key={v._id} style={{marginBottom:"5px"}}>
                    <Header
                        title={v.user}
                        thumb={require(`../img/${v.headerpic}.jpg`)}
                        thumbStyle={{width:"20%",marginRight:"20px"}}
                        extra={<span>{v.title}</span>}
                    ></Header>
                    <Body>
                        {v.desc.split('\n').map(res=>(
                            <div key={res}>{res}</div>
                        ))}
                    </Body>
                </Card>:null
            ))}
        </WingBlank>
        )  
    }

}



export default Boss