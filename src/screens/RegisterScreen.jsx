import React, { useState, useEffect } from "react";
import {
    Navbar,
    NavDropdown,
    Nav,
    Form,
    Container,
    FormControl,
    Button,
    InputGroup,
    Row,
    Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer, Link } from "react-router-dom";
import { register } from "../actions/userActions";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(
        (state) => state.userRegister
    );
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("passwords are not match");
        } else {
            setMessage(null);
            dispatch(register(name, email, password));
        }
    };

    return (
        <FromContainer>
            {message && <Message message={message}></Message>}
            {error && <Message message={error}></Message>}
            {loading && <Loader />}
            <Form className="py-3" onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>name</Form.Label>

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-user"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

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

                <Form.Group>
                    <Form.Label>confirm password</Form.Label>

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-lock"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                            type="password"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={({ target }) =>
                                setConfirmPassword(target.value)
                            }
                        />
                    </InputGroup>
                </Form.Group>

                <Button type="submit" variant="dark">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    <div>
                        <span>Have an account? </span>
                        <Link
                            to={
                                redirect
                                    ? `/login/?redirect=${redirect}`
                                    : `/login`
                            }
                        >
                            Login
                        </Link>
                    </div>
                </Col>
            </Row>
        </FromContainer>
    );
};

export default RegisterScreen;
