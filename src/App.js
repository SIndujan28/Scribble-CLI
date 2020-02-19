import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] =useState(false);
  const [isAuthenticating, setIsAuthenticating] =useState(true);
  console.log(typeof(userHasAuthenticated))
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    }
  useEffect(() => {
    onLoad();
    }, []);

  async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch(e) {
        if (e !== 'No current user') {
        alert(e);
          }
        }
      setIsAuthenticating(false);
      }


  return (
  !isAuthenticating &&
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
