import React,{Fragment} from 'react'
import {InputItem, NavBar, Icon, List} from 'antd-mobile'
import {connect} from 'react-redux'
import {actionCreator} from '../../store/chat'

@connect(
  state => {
    return {
      user: state.get('user').get('user'),
      chatmsg: state.get('chat').get('chatmsg')
    }
  },
  dispatch => {
    return {
      handlerSubmit({from, to, content}) {
        return dispatch(actionCreator.sendMsg({from, to, content}))
      },
      getChatMsg() {
        return dispatch(actionCreator.getChatMsg())
      },
      recvMsg() {
        return dispatch(actionCreator.recvMsg())
      }
    }
  }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      content:''
    }
  }

  componentDidMount(){
    this.props.getChatMsg()
    this.props.recvMsg()
  }
  render(){
    const {username} = this.props.match.params
    const {content} = this.state
    const {chatmsg} = this.props
    const newChatmsg = chatmsg.toJS()
    return (
      <Fragment>
        <NavBar
          icon={<Icon type='left' />}
          onLeftClick={()=>this.props.history.goBack()}
        >{username}</NavBar>
        <List>
          {
            newChatmsg.map(v=><InputItem key={v._id}>{v.content}</InputItem>)
          }
        </List>
        <div className='stick-footer'>
          <InputItem
            value={content}
            onChange={v=>this.setState({content:v})}
            extra={<div onClick={()=>this.handlerSubmit()}>发送</div>}
          ></InputItem>
        </div>
      </Fragment>
    )
  }

  handlerSubmit(){
    const newUser = this.props.user.toJS()
    const from = newUser._id // 
    const to = this.props.match.params.username
    const {content} = this.state
    this.props.handlerSubmit({from, to, content})
    this.setState({content:''})
  }
}

export default Chat