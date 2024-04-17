import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <div className="Navigation">
      <Navbar style={{
        backgroundColor: "#D70F64",
        height: "70px"
      }}>
        <NavbarBrand href='/' className='mr-auto ml-md-5 Brand'>
          <img src={Logo} alt="Logo" width="80px" />
        </NavbarBrand>

        <Nav className='me-md-5'>
          <NavItem className='NavItem'>
            <NavLink to='/' className='NavLink'>BurgerBuilder</NavLink>
          </NavItem>
          <NavItem className='NavItem'>
            <NavLink to='/orders' className='NavLink'>Orders</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header