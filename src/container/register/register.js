import React, {Component} from 'react'
import { Redirect,Link } from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { List, InputItem,WingBlank,WhiteSpace,Button,Radio,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import{ register } from '../../redux/user.redux'

import tchatForm from './../../components/tchat-form/tchat-form';

@connect(
    state=>state.user,
    {register}
)

@tchatForm
class Register extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius'
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }

    // failToast() {
    //     Toast.fail(`请输入用户名或者密码 !!!`, 2)
    // }

    handleRegister(){
        // (this.state.user || this.state.pwd) ? null : this.failToast()
        this.props.register(this.props.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div className="register-style">
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={(v) => this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={(v) => this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={(v) => this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <p>请选择您的身份</p>
                    <RadioItem
                        checked={this.props.state.type == "genius"}
                        onChange={() => this.props.handleChange('type','genius')}
                        >
                        牛仁
                    </RadioItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.props.state.type == "boss"}
                        onChange={() => this.props.handleChange('type','boss')}   
                        >
                        BOSS
                    </RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace />
                </List>
                <Link to='/login' className='go-login'>已有账号？ 去登陆</Link>
            </div>
        )
    }
}



export default Register