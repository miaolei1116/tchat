import React,{ Component } from 'react'

export default function tchatForm(Comp){
    return class WrapperComp extends Component{
        constructor(props){
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }

        handleChange(key,val){
            // console.log(key,val)
            this.setState({
                [key]:val
            })
        }

        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}