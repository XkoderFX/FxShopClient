import React, { useState, useEffect } from "react";
import { Col, Row, Spinner, Container } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import { Helmet } from "react-helmet";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const { products, loading, error, page, pages } = useSelector(
        (state) => state.productList
    );

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, pageNumber, keyword]);

    if (error) {
        return <Message message={error.message} />;
    }

    if (!loading) {
        return (
            <>
                <Helmet>
                    <title>Welcome to FxShop</title>
                    <meta
                        name="description"
                        content="the quality as higher as possible price as lowest as possible"
                    />
                    <meta
                        name="keywords"
                        content="electronics, buy electronics, cheap electronics"
                    />
                </Helmet>
                {!keyword && <ProductCarousel />} 
                <h1>Latest products</h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                />
            </>
        );
    }

    return <Loader></Loader>;
};

export default HomeScreen;
