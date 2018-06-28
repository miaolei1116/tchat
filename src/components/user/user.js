import React,{ Component } from 'react'
import { Result, Icon, WhiteSpace, List, Brief, Button, Modal } from 'antd-mobile';

import { connect } from 'react-redux'
import cookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=>state.user,
    {logoutSubmit}
)


class User extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }


    logout(){
        const alert = Modal.alert
        alert('注销', '确定退出么?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                                cookie.erase('userid')
                                this.props.logoutSubmit()
                            } }
        ])

        // 

    }
    
    render() {
        const props = this.props
        // console.log(this.props)
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.headerpic}.jpg`)} alt='' 
                                style={{width:"100%",display:"lineBlock",borderRadius:"50%",border:'1px solid #000'
                        }}/>}
                    title={this.props.user}
                    message={props.type=="boss"?props.company:null}
                ></Result>
                <List 
                    renderHeader={()=>"简介"}
                >
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资待遇 : {props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button type="warning" onClick={this.logout} style={{zIndex:9}}>注销</Button><WhiteSpace />
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}></Redirect>
    }
}


export default User