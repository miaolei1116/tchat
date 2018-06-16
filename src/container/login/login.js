import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { List, InputItem,WingBlank,WhiteSpace,Button,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

@connect(
    state=>state.user,
    { login }
)

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }

    failToast() {
        Toast.fail(`请输入用户名或密码 !!!`, 2)
    }
    showToast() {
        Toast.info(`${this.props.msg} !!!`, 1);
    }

    handleLogin() {
        // (this.state.user || this.state.pwd) ? null : this.failToast()
        // this.props.msg ? this.showToast() : null
        this.props.login(this.state)
    }

    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        {/* {console.log(this.props.msg)} */}
                        <InputItem
                            onChange={(v) => this.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={(v) => this.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}



export default Login