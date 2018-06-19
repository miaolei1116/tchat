import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom';
 
@withRouter

class NavLinkBars extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        return(
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                            title={v.text}
                            key={v.path}
                            icon={{uri: require(`./imgs/${v.icon}.jpg`)}}
                            selectedIcon={{uri: require(`./imgs/${v.icon}-active.jpg`)}}
                            selected={pathname==v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBars