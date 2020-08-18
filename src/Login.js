import React from 'react'
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap'

export class Login extends React.Component {

    render() {

        return (
            <div>
                <Container>
                    <Row >
                        <Col className="text-center">
                            <h1>Join Brain<span style={{ fontWeight: 100 }}>Map</span></h1>
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

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formRememberMe">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Start Brainstorming
                                </Button>
                                <Form.Group controlId="formRegister">
                                <Form.Label>No Account?</Form.Label> <Button className="mb-1" variant="link" type="submit">Create one</Button>
                                </Form.Group>
                                
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Login;