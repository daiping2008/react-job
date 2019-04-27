import React, {Fragment} from 'react'
import { Card, WhiteSpace } from 'antd-mobile'

import {connect} from 'react-redux'

import {actionCreator} from '../../../store/dashboard'

const mapStateToProps = state => {
  return {
    list: state.get('dashboard').get('list')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDashBoardList(type) {
      return dispatch(actionCreator.getDashBoardList(type))
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class BossList extends React.Component {
  render() {
    const {list} = this.props
    const newList = list.toJS()
    return (
      <div style={{paddingTop:'10px'}}>
        {
          newList.length>0 ? 
            (newList.map((v, idx)=>(
              <Fragment key={idx}>
                <Card>
                  <Card.Header
                    title={v.username}
                    thumb={require(`../../../assets/img/avators/${v.avator?v.avator:'boy'}.png`)}
                  />
                  <Card.Body>
                    {v.type==='boss'? <div>公司:{v.company}</div> :null}
                    {
                      v.desc&& v.desc.split('\n').map(d=><div key={d}>{d}</div>)
                    }
                    {v.type==='boss'? <div>薪资:{v.money}</div> :null}
                  </Card.Body>
                </Card>
                <WhiteSpace/>
              </Fragment>
            ))) :
            null
        }
      </div>
    )
  }
  
  componentDidMount() {
    this.props.getDashBoardList('boss')
  }
}

export default BossList