import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { List, InputItem,WingBlank,WhiteSpace,Button,Radio,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import{ register } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {register}
)


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    failToast() {
        Toast.fail('请补全用户信息 !!!', 1)
    }

    handleRegister(){
        this.props.msg ? this.failToast() : null
        this.props.register(this.state)
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    {/* {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null} */}
                    <InputItem
                        onChange={(v) => this.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={(v) => this.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={(v) => this.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <RadioItem
                        checked={this.state.type == "genius"}
                        onChange={() => this.handleChange('type','genius')}
                        >
                        牛仁
                    </RadioItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.state.type == "BOSS"}
                        onChange={() => this.handleChange('type','BOSS')}   
                        >
                        BOSS
                    </RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}



export default Register