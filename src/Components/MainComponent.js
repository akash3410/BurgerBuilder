import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Routes, Route, Navigate } from 'react-router-dom';
import Orders from './Orders/Orders';
import CheckOut from './Orders/CheckOut';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/AuthActionCreators';
import Logout from './Auth/Logout';

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(authCheck())
  }
}

class MainComponent extends Component {
  componentDidMount() {
    this.props.authCheck();
  }
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <Routes>
          <Route path='/login' element={<Auth />} />
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      )
    } else {
      routes = (
        <Routes>
          <Route path='/' element={<BurgerBuilder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/login' element={<Navigate to='/' />} />
        </Routes>
      )
    }
    return (
      <div>
        <Header />
        {routes}
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);