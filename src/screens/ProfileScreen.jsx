import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import * as actions from "../actions/types";
import { listMyOrders } from "../actions/orderActions";
import { updateUserProfile, getUserDetails } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { userInfo } = useSelector((state) => state.userLogin);

    const { success } = useSelector((state) => state.userUpdateProfile);

    const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
        (state) => state.orderListMy
    );

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name || success) {
                dispatch({ type: actions.USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, orders, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("passwords are not match");
        } else {
            setMessage(null);
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    return (
        <Row>
            <Col className="m-3" md={3}>
                <h2>User Profile</h2>

                {message && <Message message={message}></Message>}
                {error && <Message message={error}></Message>}
                {success && (
                    <Message
                        variant="success"
                        message="Your profile updated successfully"
                    ></Message>
                )}

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
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
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
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col className="mt-3" sm={12} md={8}>
                <h2>My orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message message={errorOrders} />
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.slice(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td className="text-center">
                                        {order.isPaid ? (
                                            order.paidAt.slice(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {order.isDelivered ? (
                                            order.deliveredAt.slice(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button variant="light">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
