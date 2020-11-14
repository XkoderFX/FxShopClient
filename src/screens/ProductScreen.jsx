import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import axios from "axios";
import { createReview, listProductsDetails } from "../actions/productActions";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types.js";

const ProductScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, error, loading } = useSelector(
        (state) => state.productDetails
    );

    const { userInfo } = useSelector((state) => state.userLogin);

    const {
        success,
        error: createReviewError,
        loading: createReviewLoading,
    } = useSelector((state) => state.productReviewCreate);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        if (success) {
            setRating(0);
            setComment(0);
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(listProductsDetails(match.params.id));
    }, [dispatch, success, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createReview(match.params.id, { comment, rating }));
    };

    if (error) {
        return <Message message={error.message} />;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6} lg={4}>
                    <Image
                        fluid
                        src={
                            product.image?.includes("uploads")
                                ? `/${product.image}`
                                : product.image
                        }
                        alt={product.name}
                    />
                </Col>
                <Col md={6} lg={5}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={12} lg={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Quantity:</Col>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            value={quantity}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        >
                                            {[
                                                ...Array(
                                                    product.countInStock
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
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                type="button"
                                className="btn-block btn-dark"
                            >
                                add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews && product.reviews.length === 0 && (
                        <Message variant="info" message="no reviews" />
                    )}
                    {createReviewError && createReviewError.status === 400 && (
                        <Message message="product already reviewed" />
                    )}
                    <ListGroup variant="flush">
                        {product.reviews &&
                            product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    {createReviewError &&
                                        createReviewError.response.status ===
                                            400 && (
                                            <Message
                                                message={
                                                    createReviewError.response
                                                        .data.error
                                                }
                                            />
                                        )}
                                    <Form.Group>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        >
                                            <option default value="">
                                                Select...
                                            </option>
                                            <option value="1">1 - poor</option>
                                            <option value="2">2 - fair</option>
                                            <option value="3">3 - good</option>
                                            <option value="4">
                                                4 - very good
                                            </option>
                                            <option value="5">
                                                5 - excellent
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button type="submit" variant="dark">
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <p>
                                    Please <Link to="/login">sign in</Link> to
                                    write a review
                                </p>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
