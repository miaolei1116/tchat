import React,{Component} from 'react'
import { WhiteSpace,Card,WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import { withRouter } from 'react-router-dom';


@connect(
    state=>state.chatuser,
    {getUserList}
)

@withRouter
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v.user}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.headerpic?(<Card 
                                    onClick={()=>this.handleClick(v)} 
                                    key={v._id} 
                                    style={{marginBottom:"5px",zIndex:'2'}}>
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
                        </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard