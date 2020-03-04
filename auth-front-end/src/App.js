import React from 'react';
import Home from './components/Home'
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Test from './components/Test';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={RegisterForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/test' component={Test} />
      </BrowserRouter>
    </div>
  );
}

export default App;
