import React from 'react';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnprivateRoute from './hocs/UnprivateRoute';

function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path='/' component={Home}/>
        <UnprivateRoute path='/login' component={Login}/>
        <UnprivateRoute path='/register' component={Register}/>
        <PrivateRoute path='/todos' roles={["user", "admin"]} component={Todos} />
        <PrivateRoute path='/admin' roles={["admin"]} component={Admin} />
    </Router>
  );
}

export default App;
