import React,{ Component } from 'react'
import { List,InputItem,NavBar,Icon,Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { sendMsg } from './../../redux/chat.redux';

import { getChatId } from '../../util'

const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    { sendMsg }
)

class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg:[]
        }
    }


    fixCarousel() {
        //修正antd表情显示的bug
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    handleSubmit(){
        // socket.emit('sendMsg',{text:this.state.text})
        // this.setState({text:""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text:'',
            showEmoji: false
        })
        // console.log(this.props)
    }

    render(){   
        const emoji = '😁 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂 😂'
                        .split(' ')
                        .filter(v=>v)
                        .map(v=>({text:v}))
        // console.log(this.props.chat.chatmsg)  
        const userid = this.props.match.params.user
        const Item = List.Item
        // console.log(user)
        const users = this.props.chat.users
        if ( !users[userid] ) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        // console.log(chatmsgs)
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' />}    
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>

                {chatmsgs.map(v=>{
                    // console.log(v)
                    const headerpic = require(`../img/${users[v.from].headerpic}.jpg`)
                    // console.log(headerpic)
                    return v.from == userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={headerpic}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item 
                                className='chat-me'
                                extra={<img src={headerpic} />}
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({
                                    text:v
                                })
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😂</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? 
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text + el.text
                                })
                            }}
                        ></Grid> : null}
                </div>
            </div>
        )
    }
}

export default Chat 