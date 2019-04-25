import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import './utils/rem'

import Login from './views/login/login'
import Register from './views/register/register'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
