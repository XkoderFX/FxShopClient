import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Form,
    Button,
    Card,
    Image,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const quantity = location.search
        ? Number(location.search.split("=")[1])
        : 1;
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                {cartItems.length === 0 ? (
                    <Message message="your cart is empty" />
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                dispatch(
                                                    addToCart(
                                                        item._id,
                                                        Number(e.target.value)
                                                    )
                                                );
                                            }}
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                removeFromCartHandler(item._id);
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} className="mt-3">
                <ListGroup>
                    <ListGroup.Item>
                        <h2>
                            total Items (
                            {cartItems.reduce((acc, item) => {
                                return acc + item.quantity;
                            }, 0)}
                            )
                        </h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>
                            total Price: (
                            {cartItems.reduce((acc, item) => {
                                return acc + item.price * item.quantity;
                            }, 0)}
                            )
                        </h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button
                            onClick={checkoutHandler}
                            className="btn-block"
                            disabled={cartItems.length === 0}
                        >
                            Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    );
};

export default CartScreen;
