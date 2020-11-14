import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Carousel, Image } from "react-bootstrap";
import { listTopProducts } from "../actions/productActions";
const ProductCarousel = () => {
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(
        (state) => state.productTopRated
    );

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    } else if (error) {
        return <Message message={error} />;
    } else {
        return (
            <Carousel
                pause="hover"
                className="bg-dark text-center justify-content-center mt-3"
            >
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image
                                fluid
                                src={
                                    product.image.includes("uploads")
                                        ? `/${product.image}`
                                        : product.image
                                }
                                alt={product.name}
                            />
                            <Carousel.Caption className="carousel-caption">
                                <h2>
                                    {product.name} ({product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }

    return <div></div>;
};

export default ProductCarousel;
