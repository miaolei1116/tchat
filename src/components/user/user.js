import React,{ Component } from 'react'
import { Result, Icon, WhiteSpace, List, Brief } from 'antd-mobile';

import { connect } from 'react-redux'



@connect(
    state=>state.user
)


class User extends Component {

    render() {
        const props = this.props
        console.log(this.props)
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
                    <Item>注销</Item>
                </List>
            </div>
        ) : null
    }
}


export default User