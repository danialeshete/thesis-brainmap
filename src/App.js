import React, { Component } from "react";
import logo from "./logo.svg";
import MindMap from "./MindMap";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import Session from "./Session";
import Draggable from "./Draggable";
import Banner from "./Banner";
import Lottie from "react-lottie";
import ClickMap from "./ClickMap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./NavBar.css";
import * as d3 from "d3";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Container>
            <Navbar expand="lg" variant="light">
              <Navbar.Brand href="/">
                <h1>
                  Brain<span style={{ fontWeight: 100 }}>Map</span>
                </h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/about">About</Nav.Link>
                  <Nav.Link href="/contact">Contact</Nav.Link>
                  <Nav.Link href="/session">Session</Nav.Link>
                  <Nav.Link href="/mindmap">MindMap</Nav.Link>
                  <Nav.Link href="/draggable">Draggable</Nav.Link>
                  <Nav.Link href="/clickmap">ClickMap</Nav.Link>
                </Nav>

                <Button href="/login" variant="primary">
                  Anmelden
                </Button>
                <Button href="/register" variant="outline-dark">
                  Registrieren
                </Button>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Route exact path="/" component={Banner} />
          <Route path="/about" component={Banner} />
          <Route path="/contact" component={Banner} />
          <Route path="/session" component={Session} />
          <Route path="/mindmap" component={MindMap} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/draggable" component={Draggable} />
          <Route path="/clickmap" component={ClickMap} />
        </Router>
      </div>
    );
  }
}

export default App;
