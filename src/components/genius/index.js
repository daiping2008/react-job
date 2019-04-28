import React from 'react'
import {NavBar, Icon, InputItem, TextareaItem, Button} from 'antd-mobile'

import {connect} from 'react-redux'

import {actionCreator} from '../../store/user'

import AvatorSelect from '../avatorSelect'
import HocForm from '../../components/hoc/hocForm'
const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser({avator, job, desc}) {
      return dispatch(actionCreator.updateUser({avator, job, desc}))
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
@HocForm
class Genius extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      avator:'',
      desc:'',
      job:''
    }

    this.selectAvator = this.selectAvator.bind(this)
  }
  render() {
    const {handlerChange} = this.props
    return (
      <div>
        <NavBar
          icon={<Icon type='left' size='lg' />}
          onLeftClick={() => this.props.hideModal()}
        >牛人信息完善页面</NavBar>
        <div>
          <AvatorSelect selectAvator={this.selectAvator} />
          <InputItem onChange={v => handlerChange('job', v)}>求职岗位</InputItem>
          <TextareaItem
            onChange= {v => handlerChange('desc', v)}
            rows={3}
            title='个人见解'
          ></TextareaItem>
          </div>
          <Button type='primary' onClick={()=> this.updateUser()}>保存</Button>
      </div>
    )
  }

  updateUser() {
    const {avator, job, desc} = this.props.state
    this.props.updateUser({avator, job, desc})
    this.props.hideModal()
  }

  selectAvator(avator) {
    this.setState({
      avator
    })
  }
}

export default Genius