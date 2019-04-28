import React from 'react'
import {NavBar,Icon,InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import AvatorSelect from '../avatorSelect'
import HocForm from '../../components/hoc/hocForm'
import {actionCreator} from '../../store/user'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser({avator, job, company, money, desc}) {
      return dispatch(actionCreator.updateUser({avator, job, company, money, desc}))
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
@HocForm
class Boss extends React.Component {

  render() {
    const {handlerChange} = this.props
    return (
      <div>
        <NavBar
          icon={<Icon type='left' size='lg' />}
          onLeftClick={()=>{this.props.hideModal()}}
        >BOSS信息完善页面</NavBar>
        <div>
          <AvatorSelect selectAvator={avator => {this.setState({avator})}} />
          <InputItem onChange={v=>handlerChange('job', v)}>招聘职位</InputItem>
          <InputItem onChange={v=>handlerChange('company', v)}>公司名称</InputItem>
          <InputItem onChange={v=>handlerChange('money', v)}>职位薪资</InputItem>
          <TextareaItem
            onChange={v=>handlerChange('desc', v)}
            rows={3}
            autoHeight
            title='职位要求'
          ></TextareaItem>
          <Button type='primary' onClick={() => {this.updateUser()}}>保存</Button>
        </div>
      </div>
    )
  }
  updateUser() {
    const {avator, job, company, money, desc} = this.props.state
    this.props.updateUser({avator, job, company, money, desc})
    this.props.hideModal()
  }
}

export default Boss