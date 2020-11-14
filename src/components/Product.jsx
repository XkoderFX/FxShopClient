import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const image = product.image.includes("uploads")
        ? `/${product.image}`
        : product.image;

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={image} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title style={{ color: "black" }} as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color="red"
                    />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
