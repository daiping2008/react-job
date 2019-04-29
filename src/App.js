import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import './utils/rem'

import Login from './views/login/login'
import Register from './views/register/register'
import Dashboard from './views/dashboard/dashboard'
import Authroute from './components/authroute'
import Chat from './views/chat/chat'
import './assets/styles/global.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Authroute></Authroute>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/chat/:username' component={Chat} />
            <Route path='/' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
