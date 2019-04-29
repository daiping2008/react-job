import React,{Fragment} from 'react'
import {InputItem, NavBar, Icon, List, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {actionCreator} from '../../store/chat'
import Emoji from '../../utils/emoji'

@connect(
  state => {
    return {
      user: state.get('user').get('user'),
      chatmsg: state.get('chat').get('chatmsg'),
      selectedItem: state.get('dashboard').get('selectedItem')
    }
  },
  dispatch => {
    return {
      handlerSubmit({from, to, content}) {
        return dispatch(actionCreator.sendMsg({from, to, content}))
      },
      getChatMsg({from, to}) {
        return dispatch(actionCreator.getChatMsg({from, to}))
      }
    }
  }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      content:'',
      show:false
    }
  }

  render(){
    const {content, show} = this.state
    const {chatmsg, user, selectedItem} = this.props
    const newChatmsg = chatmsg.toJS()
    const newUser = user.toJS()
    const newSelectedItem = selectedItem.toJS()

    const emoji = Emoji.content.split(' ').map(v=>({text:v}))

    // 组装新对象显示头像，姓名
    const newObj = {
      from:{ avator: newUser.avator, username: newUser.username },
      to:{ avator:newSelectedItem.avator, username:newSelectedItem.username }
    }
    return (
      <Fragment>
        <NavBar
          icon={<Icon type='left' size='lg' />}
          onLeftClick={()=>this.props.history.goBack()}
        >{newSelectedItem.company?newSelectedItem.company:newSelectedItem.username}</NavBar>
        <div className='page-content'>
          <List>
            {
              newChatmsg.map(v => {
                if (v.from === newUser._id) {
                  return <List.Item 
                    className='chat-right'
                    extra={this.renderAvator(newObj.from.avator?newObj.from.avator:'boy')}
                    key={v._id}>
                    {v.content}
                  </List.Item>
                } else {
                  return <List.Item 
                    thumb={require(`../../assets/img/avators/${newObj.to.avator?newObj.to.avator:'boy'}.png`)}
                    key={v._id}>
                    {v.content}
                  </List.Item>
                }
              })
            }
          </List>
        </div>
        <div className='stick-footer'>
          {
            show ? 
              <Grid 
                data={emoji}
                columnNum={10}
                carouselMaxRow={3}
                isCarousel={true}
                renderItem={el=><div style={{marginTop:'10px'}}>{el.text}</div>}
                onClick={el=>(this.setState({content:this.state.content+el.text}))}
              /> : null
          }
          <InputItem
            value={content}
            onChange={v=>this.setState({content:v})}
            extra={<div style={{flex: 1,display:'flex',width:'70px',height:'25px',justifyContent:'space-around',alignItems:'center'}}>
              <div onClick={()=>{
                setTimeout(() => {
                  window.dispatchEvent(new Event('resize'))
                }, 0);
                this.setState({show:!this.state.show})
              }}>{emoji[0].text}</div>
              <div onClick={()=>this.handlerSubmit()}>发送</div>
            </div>}
          ></InputItem>
        </div>
      </Fragment>
    )
  }

  componentDidMount(){
    const selectedItem = this.props.selectedItem.toJS()
    const user = this.props.user.toJS()
    this.props.getChatMsg({
      from: user._id,
      to:selectedItem._id
    }) 
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }

  renderAvator(avator){
    return <img src={require(`../../assets/img/avators/${avator}.png`)} alt='' />
  }

  handlerSubmit(){
    const newUser = this.props.user.toJS()
    const from = newUser._id // 
    const to = this.props.match.params.username
    const {content} = this.state
    this.props.handlerSubmit({from, to, content})
    this.setState({content:'', show:false})
  }
}

export default Chat