import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
import {
    createOrder,
    getOrderDetails,
    payOrder,
    deliverOrder,
} from "../actions/orderActions";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../actions/types";
import Loader from "../components/Loader";

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);

    const { order, loading, error } = useSelector(
        (state) => state.orderDetails
    );

    const { loading: loadingPay, success: successPay } = useSelector(
        (state) => state.orderPay
    );

    const { loading: loadingDeliver, success: successDeliver } = useSelector(
        (state) => state.orderDeliver
    );

    if (order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }

        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => setSdkReady(true);
            document.body.append(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else setSdkReady(true);
        }
    }, [dispatch, orderId, successPay, successDeliver, order]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    if (loading) {
        return <Loader></Loader>;
    }
    if (error) {
        return <Message message={error}></Message>;
    } else if (order) {
        return (
            <>
                <h1>Order: {order._id}</h1>
                <Row>
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: {order.user.name}</strong>
                                </p>
                                <p>
                                    <strong>Email: </strong>{" "}
                                    <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </p>

                                <p>
                                    <strong>Address:</strong>{" "}
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.country}
                                    {order.isDelivered ? (
                                        <Message
                                            variant="success"
                                            message={`Delivered at ${order.deliveredAt}`}
                                        />
                                    ) : (
                                        <Message message="Not Delivered" />
                                    )}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message
                                        variant="success"
                                        message={`paid at ${order.paidAt}`}
                                    />
                                ) : (
                                    <Message message="Not Paid" />
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message message="Order is empty" />
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                            src={item.image}
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <Link
                                                            style={{
                                                                color: "black",
                                                            }}
                                                            to={`/product/${item._id}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity} x $
                                                        {item.price} = $
                                                        {item.price *
                                                            item.quantity}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkReady ? (
                                        <Loader></Loader>
                                    ) : (
                                        <PayPalButton
                                            className="btn-block"
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                    {loadingDeliver && <Loader />}
                                </ListGroup.Item>
                            )}

                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            onClick={deliverHandler}
                                            block
                                            variant="dark"
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                </Row>
            </>
        );
    } else {
        return <></>;
    }
};

export default OrderScreen;
