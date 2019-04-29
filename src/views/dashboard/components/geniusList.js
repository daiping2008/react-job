import React from 'react'
import {connect} from 'react-redux'
import CartItem from '../../../components/cardItem'
import {actionCreator} from '../../../store/dashboard'

@connect(
  state=>{
    return {
      user: state.get('user').get('user'),
      list: state.get('dashboard').get('list')
    }
  }, 
  dispatch => {
    return {
      getDashBoardList(type) {
        return dispatch(actionCreator.getDashBoardList(type))
      }
    }
  })
class Genius extends React.Component{
  render() {
    const {list} = this.props
    const newList = list.toJS()
    return (
      <div style={{paddingTop:'10px'}}>
        {
          newList.length>0 ? 
            newList.map((v, idx)=><CartItem key={idx} data={v}/> ) : null
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.getDashBoardList('genius')
  }
}

export default Genius