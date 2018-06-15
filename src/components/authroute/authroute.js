import React,{Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

// 将路由信息绑定到组件
@withRouter
@connect(
    null,
    { loadData }
)

class AuthRoute extends Component {
    componentDidMount(){
        const publicList = ['/login','register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }

        // 获取用户信息，
        axios.get('/user/info')
            .then(res => {
                if(res.status == 200){
                    if(res.data.code == 0){
                        // 有登陆信息的
                        // console.log(res)
                        this.props.loadData(res.data.data)
                    }else{
                        this.props.history.push('./login')
                    }
                }
            })

        // 是否登录

        // 目前的url， login无需登录

        // 用户的type 是genius还是boss

        // 用户是否完善信息

    }

    render(){
        return null
    }
}

export default AuthRoute