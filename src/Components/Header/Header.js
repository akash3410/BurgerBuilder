import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Logo from '../../assets/logo.png'

const Header = () => {
  return (
    <div>
      <Navbar>
        <NavbarBrand href='/'>
          <img src={Logo} alt="Logo" width="80px" />
        </NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink href='/'>Something</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header