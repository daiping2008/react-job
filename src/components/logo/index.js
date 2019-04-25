import React from 'react'

import './index.scss'

class Logo extends React.Component {
  render() {
    return (
      <div className='logo-container'>
        <img src={require('./job.png')} alt='' width='256px' height='256px' />
      </div>
    )
  }
}

export default Logo