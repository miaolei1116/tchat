import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { List, InputItem,WingBlank,WhiteSpace,Button,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

import tchatForm from '../../components/tchat-form/tchat-form'


// function hello(){
//     console.log('heolllwos')
// }

// function weHello(fn){
//     return function(){
//         console.log("before say hello")
//         fn()
//         console.log("after say hello")
//     }
// }
// hello = weHello(hello)
// hello()

// 属性代理的功能如下
// function weHello(Comp) {
//     class weComp extends Component {

//         render(){
//             return( 
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//             )
           
//         }
//     }
//     return weComp
// }


// @weHello
// class Hello extends Component {
//     render(){
//         return <h2>hello i is miao</h2>
//     }
// }

// 用上面的 @weHello 给替代了，下面的一行代码可省略
// Hello = weHello(Hello)


// 反向继承， 用于修改组件的生命周期和渲染逻辑
// function weHello(Comp) {
//     class weComp extends Comp {
        
//         componentDidMount(){
//             console.log("高阶组件新增的生命周期，加载完成")
//         }

//         render(){
//             return <Comp></Comp>
           
//         }
//     }
//     return weComp
// }

// @weHello
// class Hello extends Component {
//     render(){
//         return <h2>hello i is miao</h2>
//     }
// }

@connect(
    state=>state.user,
    { login }
)


@tchatForm
class Login extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     user:'',
        //     pwd:''
        // }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }

    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }

    failToast() {
        Toast.fail(`请输入用户名或密码 !!!`, 2)
    }
    showToast() {
        Toast.info(`${this.props.msg} !!!`, 1);
    }

    handleLogin() {
        // (this.state.user || this.state.pwd) ? null : this.failToast()
        // this.props.msg ? this.showToast() : null
        this.props.login(this.props.state)
    }

    render(){
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !='/login' ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        {/* {console.log(this.props.msg)} */}
                        <InputItem
                            onChange={(v) => this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={(v) => this.props.handleChange('pwd',v)}
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