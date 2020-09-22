import React from "react";
import Lottie from "react-lottie";
import animationData from "https://assets1.lottiefiles.com/packages/lf20_xprXnu.json";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./Register";
import MindMap from "./MindMap";
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
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        background: "transparent"
      }
    };
    return (
      <div>
        <Container id="banner-container">
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
          <Row className="lottie">
            <Lottie options={defaultOptions} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
