import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/9408-creative-process.json";
import teamWorkAnimationData from "../assets/18045-teamwork-is-all-we-need.json";
import teamWorkAnimationData2 from "../assets/17056-smartsharp-animations-volume-2.json";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from "./Register";
import MindMap from "./MindMap";


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
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const teamWorkAnimation = {
      loop: true,
      autoplay: true,
      animationData: teamWorkAnimationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const teamWorkAnimation2 = {
      loop: true,
      autoplay: true,
      animationData: teamWorkAnimationData2,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div>
        <Container id="banner-container">
          <Row>
            <Col className="lottie" sm="12" md="6">
              <Lottie options={defaultOptions} />
              {/* <a className="btn btn-success" href="../Login/Login.js"> Start Brainstorming</a> */}
            </Col>
            <Col sm="12" md="6" className="pt-3 my-auto">
              <b>
                Brain<span style={{ fontWeight: 100 }}>Map</span>{" "}
              </b>
              <h2>It all starts with an Idea</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt, natus. Natus reprehenderit fugit voluptate a quidem,
                quo porro temporibus fuga aut sed hic, voluptates, non ipsam est
                molestiae reiciendis eaque?
              </p>
              <Router>
                <Button
                  variant="primary" href="/MindMap">
                  Start Brainstorming
                </Button>

                <Button className="offset-sm-1" variant="outline-dark" href="/register">
                  Sign Up
                </Button>
                <Route path="/MindMap" component={MindMap} />
                <Route path="/register" component={Register} />
              </Router>
            </Col>
          </Row>
          <Row className="px-4 mt-3">
            <Col sm="12" md="6" className="pt-3 my-auto">
              <Row>
                <b>
                  Team<span style={{ fontWeight: 100 }}>Work</span>{" "}
                </b>
                <h2 style={{ textTransform: "uppercase" }}>
                  brainstorming strengthens teamwork
                </h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nesciunt, natus. Natus reprehenderit fugit voluptate a quidem,
                  quo porro temporibus fuga aut sed hic, voluptates, non ipsam
                  est molestiae reiciendis eaque?
                </p>
                <Col sm="6" md="6">
                  <FontAwesomeIcon icon={faCoffee} />
                  <p>
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam
                    ad, nam no suscipit quaerendum.
                  </p>
                </Col>
                <Col sm="6" md="6">
                  <FontAwesomeIcon icon={faCoffee} />
                  <p>
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam
                    ad, nam no suscipit quaerendum.
                  </p>
                </Col>
              </Row>
            </Col>

            <Col className="lottie" sm="12" md="6">
              <Lottie options={teamWorkAnimation} />
              {/* <a className="btn btn-success" href="../Login/Login.js"> Start Brainstorming</a> */}
            </Col>
          </Row>

          <Row className="px-4 mt-3">
            <Col sm="12" md="6" className="pt-3 my-auto">
              <b>
                Team<span style={{ fontWeight: 100 }}>Work</span>{" "}
              </b>
              <h2 style={{ textTransform: "uppercase" }}>
                brainstorming strengthens creativity
              </h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt, natus. Natus reprehenderit fugit voluptate a quidem,
                quo porro temporibus fuga aut sed hic, voluptates, non ipsam est
                molestiae reiciendis eaque?
              </p>
            </Col>
            <Col className="lottie" sm="12" md="6">
              <Lottie options={teamWorkAnimation2} />
              {/* <a className="btn btn-success" href="../Login/Login.js"> Start Brainstorming</a> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
