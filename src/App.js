import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import './utils/rem'

import Login from './views/login/login'
import Register from './views/register/register'
import Genius from './views/genius/genius'
import Boss from './views/boss/boss'

import './assets/styles/global.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/genius' component={Genius} />
          <Route path='/boss' component={Boss} />
          <Route path='/' component={Login} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
