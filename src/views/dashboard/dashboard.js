import React from 'react'
import {NavBar, TabBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'

import {connect} from 'react-redux'

import User from './components/user'
import BossList from './components/bossList'
import GeniusList from './components/geniusList'

function Msg(params) {
	return <h1>MSG</h1>
}

const mapStateToProps = state => {
	return {
		user:state.get('user').get('user')
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component {
  
  render() {
		const {user} = this.props
		const newUser = user.toJS()
		const {type} = newUser
		// const type = 'genius'
    const navList = [
			{
				path:'/dashboard/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:GeniusList,
				hide:type==='genius'
			},
			{
				path:'/dashboard/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:BossList,
				hide:type==='boss'
			},
			{
				path:'/dashboard/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/dashboard/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
    ]
		const {pathname} = this.props.location
		const newNavList = navList.filter(v=>!v.hide)
    return (
      <div>
        <NavBar>{navList.find(v=>v.path===pathname).title}</NavBar>
				<div className='page-content'>
					<Switch>
						{
							navList.map((v, idx) => <Route key={idx} path={v.path} component={v.component} />)
						}
					</Switch>
				</div>
				<TabBar>
					{
						newNavList.map(v => (
							<TabBar.Item
								key={v.path}
								title={v.text}
								icon={{uri:require(`./img/${v.icon}.png`)}}
								selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
								selected={pathname===v.path}
								onPress={()=>this.props.history.push(v.path)}
							></TabBar.Item>
						))
					}
				</TabBar>
      </div>
    )
  }
}

export default Dashboard