import React, { Component } from 'react'
import { NavBar,Icon,InputItem,WhiteSpace,TextareaItem,Button } from 'antd-mobile'

import HeaderPic from '../../components/headerpic/headerpic'


class BOSSinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render(){
        return (
            <div>
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
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}



export default BOSSinfo