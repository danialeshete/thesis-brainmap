import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ClickMap from "./ClickMap";
import Login from "./Login";

export class Register extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>
                Join Brain<span style={{ fontWeight: 100 }}>Map</span>
              </h1>
              <h3>Sign in to start brainstorming</h3>
            </Col>
          </Row>
          <Row>
            <Col className="col-xs-12 col-md-4 mx-auto ">
              <Form className="mt-4">
                <Form.Group controlId="formName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group controlId="formCheckbox">
                  <Form.Check type="checkbox" label="Accept AGB" required/>
                </Form.Group>
                <Router>
                  <Button variant="primary" type="submit" href="/clickmap">
                    Start Brainstorming
                  </Button>
                  <Form.Group controlId="formRegister">
                    <Form.Label>Already have an account?</Form.Label>{" "}
                    <Button className="mb-1" variant="link" type="submit" href="/login">
                      Sign in
                    </Button>
                  </Form.Group>
                  <Route path="/ClickMap" component={ClickMap} />
                  <Route path="/login" component={Login} />
                </Router>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
