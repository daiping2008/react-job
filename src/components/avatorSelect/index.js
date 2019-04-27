import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvatorSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const data = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',').map(v=>({
        icon:require(`../../assets/img/avators/${v}.png`),
        text:v
      }))

    const gridHeader = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img src={this.state.icon} alt='' />
      </div>
    ) : '选择头像'
    
    return (
      <div>
        <List renderHeader={gridHeader}></List>
        <Grid 
          data={data}
          columnNum={5}
          onClick={el =>{
            this.setState(el)
            this.props.selectAvator(el.text)
          }}
        />
      </div>
    )
  }
}

export default AvatorSelect