import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { getUserList } from './../../redux/chatuser.redux';

import { connect } from 'react-redux'
 
@withRouter

@connect(
    state=>state.chat,
    {getUserList}
)

class NavLinkBars extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    componentDidMount() {
        const user = this.props.getUserList()
    }

    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        console.log(this.props)
        return(
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                            badge={v.path=='/msg'&&this.props.chatmsg.filter(res=>res.chat)?this.props.unread:0}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./imgs/${v.icon}.jpg`)}}
                            selectedIcon={{uri: require(`./imgs/${v.icon}-active.jpg`)}}
                            selected={pathname==v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBars