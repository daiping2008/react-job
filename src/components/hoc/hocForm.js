import React from 'react'

export default function HocForm(Comp) {
  return class WrapperCom extends React.Component{
    constructor(props) {
      super(props)
      this.state = {type:'genius'}
      this.handlerChange = this.handlerChange.bind(this)
    }
    handlerChange(key, value){
      this.setState({[key]: value})
    }
    render() {
      return <Comp handlerChange={this.handlerChange} state={this.state} {...this.props} />
    }
  }
}

