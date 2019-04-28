import React from 'react'

import {connect} from 'react-redux'

import CartItem from '../../../components/cardItem'

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
            newList.map((v, idx) => <CartItem key={idx} data={v} />) :
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