import React from 'react'
import {List, Badge, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'

@connect(
  state=>{
    return {
      msg: state.get('chat').get('msg')
    }
  },
  null
)
class Msg extends React.Component{
  render() {
    const {msg} = this.props
    if (msg.size===0) {
      return null
    }
    const newMsg = msg.toJS()
    return (
       <div>
        {
          newMsg.map(v=>(
            <List key={v._id}>
              <List.Item
                thumb={require(`../../../assets/img/avators/${v.avator?v.avator:'boy'}.png`)}
                arrow='horizontal'
                extra='neir'
              >{v.content}</List.Item>
              <WhiteSpace/>
            </List>
          ))
        }
      </div>
    )
  }
}

export default Msg