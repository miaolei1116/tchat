import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid,List } from 'antd-mobile'



class HeaderPic extends Component {
    static propTypes = {
        select: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        const selectPic = ['爷们','阿姨'].map(v=>({
            icon:require(`../img/${v}.jpg`),
            text:v
        }))

        const gridHeader = this.state.text ? 
                    (<div>
                        <span style={{marginRight:'10px'}}>已选则头像</span>
                        <img style={{width:20}} src={this.state.icon} alt=""/>
                    </div>) : 
                    <div>请选择头像</div>

        return (
            <div>
                <List renderHeader={()=>gridHeader}></List>
                <Grid 
                    data={selectPic} 
                    columnNum={2}
                    onClick={v=>{
                        this.setState(v)
                        this.props.select(v.text)
                    }}
                ></Grid>
            </div>
        )
    }
}



export default HeaderPic