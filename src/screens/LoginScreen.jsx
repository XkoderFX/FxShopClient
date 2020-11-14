import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FromContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(
        (state) => state.userLogin
    );
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FromContainer>
            {error && <Message message={error}></Message>}
            {loading && <Loader />}
            <Form className="py-3" onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-envelope"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label>password</Form.Label>

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-key"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Button type="submit" variant="dark">
                    Sign in
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Costumer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register/?redirect=${redirect}`
                                : `/register`
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FromContainer>
    );
};

export default LoginScreen;
