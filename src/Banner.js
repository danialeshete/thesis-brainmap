import React from "react";
import Lottie from "react-lottie";
import { Container, Row, Button, Navbar, Nav } from "react-bootstrap";
import "./Banner.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Register";
import ClickMap from "./ClickMap";
import { ReactComponent as Logo } from './logo_black_wname.svg';
import animationData from "./lotties/working-man.json";


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
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet", 
        className: "lottie",
        viewBoxSize: "0 0 1920 1080"
      }
    };
    return (
      <div>
        <Container id="banner-container">
          <Navbar expand="lg" id="navbar_banner" >
            <Navbar.Brand href="/" className="landing_text">
              <Logo id="bannerLogo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="landing_text" />
            <Navbar.Collapse id="basic-navbar-nav" className="landing_text">
              <Nav className="ml-auto landing_text">
                <a href="/login">Login⎮</a>
                <a href="/register">Sign up</a>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Row className="p-3">
            <h1 className="landing_text" >The innovative way to brainstorm</h1>
            <h2 className="pt-1 pb-3 my-auto landing_text">
              BrainMap is a creative tool to enhance your ideation process
            </h2>


            <Router>
              <Button className="landing_text mt-3 pt-3" size="xxl" variant="brainmap" href="/clickmap">
                Start Brainstorming
              </Button>
              <Route path="/clickmap" component={ClickMap} />
              <Route path="/register" component={Register} />
            </Router>

            <h3 className="landing_text p-3">
                
              </h3>
            <Lottie className="lottieDiv" options={defaultOptions}/>
          </Row> 
         
        </Container>
      </div>
    );
  }
}

export default Banner;
