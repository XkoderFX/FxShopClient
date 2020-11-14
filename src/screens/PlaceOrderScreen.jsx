import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const TAX = 0.04;
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
    cart.taxPrice = Number((TAX * cart.itemsPrice).toFixed(2));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const { order, success, error } = useSelector((state) => state.orderCreate);

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
    }, [success]);

    const placeOrderHandler = () => {
        console.log(cart.paymentMethod);
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Row>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>{" "}
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message message="your cart is empty" />
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((cartItem, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        alt={cartItem.name}
                                                        fluid
                                                        rounded
                                                        src={cartItem.image}
                                                    />
                                                </Col>

                                                <Col>
                                                    <Link
                                                        style={{
                                                            color: "black",
                                                        }}
                                                        to={`/product/${cartItem._id}`}
                                                    >
                                                        {cartItem.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {cartItem.quantity} x $
                                                    {cartItem.price} = $
                                                    {cartItem.price *
                                                        cartItem.quantity}
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
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message message={error}></Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                variant="dark"
                                type="button"
                                className="btn-block"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
