import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] =useState(false);
  console.log(typeof(userHasAuthenticated))
  function handleLogout() {
    userHasAuthenticated(false);
    console.log(isAuthenticated)
    }
  return (
  <div className="App container">
     <Navbar fluid collapseOnSelect>
       <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? <NavItem onClick={handleLogout}>Logout</NavItem> 
            : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated,userHasAuthenticated }} />
  </div>
  );
}

export default App
