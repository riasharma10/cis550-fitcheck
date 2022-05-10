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
      const bigSize = {fontSize: '40px'}  
      return(
            <Navbar type="dark" theme="danger" expand="md">
        <NavbarBrand style={bigSize} href="/">FitCheck</NavbarBrand>
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
              <NavLink active  href="/" >
                Amazon Specific Suggestions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/graph_page">
                Analytics
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
