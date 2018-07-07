import React, {Component} from 'react';

import { List, Brief, Badge } from 'antd-mobile';
import { connect } from 'react-redux';

@connect(
    state=>state
)

class Msg extends Component {
    getLast(arr) {
        return arr[arr.length-1]
    }

    render() {
        if (!this.props.chat.chatmsg.length) {
            return null
        }   
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        // console.log(this.props)
        // console.log(msgGroup)
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).creat_time
            const b_last = this.getLast(b).creat_time
            return b_last - a_last
        })

        return (
            <div>
                <List>
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from==userid?v[0].to:v[0].from
                        console.log(targetId)
                        const unreadNum = v.filter(v=>!v.reade&&v.to==userid).length  
                        const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : ''
                        const headerPic = this.props.chat.users[targetId] ? this.props.chat.users[targetId].headerpic : ''
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${headerPic}.jpg`)}
                                    arrow='horizontal'
                                    style={{zIndex:10}}
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>
                                </Item>
                            </List>
                            
                        )
                    })}
                </List>
            </div>
        )
    }
}


export default Msg  