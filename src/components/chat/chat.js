import React,{ Component } from 'react'
import { List,InputItem,NavBar } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'

import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg }
)

class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg:[]
        }
    }

    componentDidMount(){
        // socket.on('recvMsg',(data)=>{
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
        this.props.getMsgList()
        this.props.recvMsg()
    }

    handleSubmit(){
        // socket.emit('sendMsg',{text:this.state.text})
        // this.setState({text:""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text:''
        })
        // console.log(this.props)
    }

    render(){
        // console.log(this.props)
        const user = this.props.match.params.user
        const Item = List.Item
        // console.log(user)
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {this.props.match.params.user}
                </NavBar>

                {this.props.chat.chatmsg.map(v=>{
                    // console.log(v)
                    return v.from == user ? (
                        <List key={v._id}>
                            <Item
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item 
                                className='chat-me'
                                extra={'headerpic'}
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
                            extra={<span
                                    onClick={
                                        ()=>this.handleSubmit()
                                    }
                            >发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat