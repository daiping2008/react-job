import React,{Fragment} from 'react'
import {Card, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {actionCreator} from '../../store/dashboard'

@connect(
  null,
  dispatch => {
    return {
      setSelectItem(data) {
        return dispatch(actionCreator.setSelectItem(data))
      }
    }
  }
)
@withRouter
class CardItem extends React.Component {
  render() {
    const {data} = this.props
    return (
      <Fragment>
        <Card onClick={()=>this.goChat(data)}>
          <Card.Header
            title={data.username}
            thumb={require(`../../assets/img/avators/${data.avator?data.avator:'boy'}.png`)}
          />
          <Card.Body>
            {data.type==='boss'? <div>公司:{data.company}</div> :null}
            {
              data.desc&& data.desc.split('\n').map(d=><div key={d}>{d}</div>)
            }
            {data.type==='boss'? <div>薪资:{data.money}</div> :null}
          </Card.Body>
        </Card>
        <WhiteSpace/>
      </Fragment>
    )
  }
  goChat(data) {
    this.props.setSelectItem(data)
    this.props.history.push(`/chat/${data._id}`)
  }
}

export default CardItem