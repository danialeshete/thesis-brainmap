import React from "react";
import Lottie from "react-lottie";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import "./Banner.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./Register";
import ClickMap from "./ClickMap";

export class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin(e) {
    const view = e.target.value;
    this.props.onClick(view);
    console.log(this.props.onClick);
    e.preventDefault();
  }
  handleRegister(e) {
    const view = e.target.value;
    this.props.onClick(view);
    console.log(this.props.onClick);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Container id="banner-container">
          <Navbar expand="lg" id="navbar_banner">
            <Navbar.Brand href="/">
              BrainMap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <a href="/login">Login</a> |<a href="/register">Sign up</a>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Row className="justify-content-md-center pt-3 my-auto">
            <h1>The inovative way to brainstorm</h1>
            <h2 className="pt-1 pb-3 my-auto">
              BrainMap is a creative tool to enhance your ideation process
            </h2>
            <Router>
              <Button size="xxl" variant="brainmap" href="/clickmap">
                Start Brainstorming
              </Button>

              <h3 className="pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
                pellentesque magna tellus eu sollicitudin. Sit commodo amet, sit
                aliquam viverra eget eget amet. Ac nisl mauris faucibus iaculis
                molestie viverra.
              </h3>
              <Route path="/clickmap" component={ClickMap} />
              <Route path="/register" component={Register} />
            </Router>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
