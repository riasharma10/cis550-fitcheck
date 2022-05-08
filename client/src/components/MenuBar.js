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
        <NavbarBrand href="/">FitCheck</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/clothing_suggest">
                Clothing Suggestions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/product_info">
                Clothing Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/amazon_suggest" >
                Amazon Specific Suggestions
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
