import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">CIS 550 FIFA</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/review">
                Players
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/suggestions" >
                Matches
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/profile" >
                Matches
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
