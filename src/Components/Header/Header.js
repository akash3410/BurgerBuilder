import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.png';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const Header = props => {
  let links = null;
  if (props.token === null) {
    links = <Nav className='me-md-5'>
      <NavItem className='NavItem'>
        <NavLink to='/login' className='NavLink'>SignUp/Login</NavLink>
      </NavItem>
    </Nav>
  } else {
    links = <Nav>
      <NavItem className='NavItem'>
        <NavLink to='/' className='NavLink'>BurgerBuilder</NavLink>
      </NavItem>
      <NavItem className='NavItem'>
        <NavLink to='/orders' className='NavLink'>Orders</NavLink>
      </NavItem>
      <NavItem className='NavItem'>
        <NavLink to='/logout' className='NavLink'>Logout</NavLink>
      </NavItem>
    </Nav>


  }
  return (
    <div className="Navigation">
      <Navbar style={{
        backgroundColor: "#D70F64",
        height: "70px"
      }}>
        <NavbarBrand href='/' className='mr-auto ml-md-5 Brand'>
          <img src={Logo} alt="Logo" width="80px" />
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  )
}

export default connect(mapStateToProps)(Header)