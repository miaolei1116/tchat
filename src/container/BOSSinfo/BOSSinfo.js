import React, { Component } from 'react'
import { NavBar,Icon,InputItem,WhiteSpace,TextareaItem,Button } from 'antd-mobile'


import HeaderPic from '../../components/headerpic/headerpic'
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(
    state=>state.user,
    { update }
)

class BOSSinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            desc:'',
            company:'',
            money:'',
            headerpic:''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {(redirect && redirect !== path) ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                {console.log(this.props.redirectTo)}
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    >
                    欢迎BOSS，请完善信息
                </NavBar>
                <WhiteSpace />
                <HeaderPic select={(imgName)=>{
                    this.setState({
                        'headerpic':imgName
                    })
                }}></HeaderPic>
                <WhiteSpace />
                <InputItem onChange={v=>this.onChange('title',v)}>
                    招聘职位
                </InputItem>
                <WhiteSpace />
                <InputItem onChange={v=>this.onChange('company',v)}>
                    公司名称
                </InputItem>
                <WhiteSpace />
                <InputItem onChange={v=>this.onChange('money',v)}>
                    薪资待遇
                </InputItem>
                <WhiteSpace />
                <TextareaItem 
                    onChange={v=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                    title='职位要求'
                    >
                </TextareaItem>
                <WhiteSpace />
                <WhiteSpace />
                <Button 
                    type='primary'
                    onClick={()=>{
                        // console.log(this.state)
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}



export default BOSSinfo