import React,{Component} from 'react'
import { WhiteSpace,Card,WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types'

class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }


    render() {
        const Header = Card.Header
        const Body = Card.Body
        console.log(this)
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


export default UserCard