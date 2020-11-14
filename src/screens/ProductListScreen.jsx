import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers, register } from "../actions/userActions";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
    createProduct,
    deleteProduct,
    listProducts,
} from "../actions/productActions";
import * as actions from "../actions/types";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber;

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);

    const { loading, error, products, page, pages } = useSelector(
        (state) => state.productList
    );

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.productDelete);

    const { success: successCreate, product: createdProduct } = useSelector(
        (state) => state.productCreate
    );

    useEffect(() => {
        dispatch({ type: actions.PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push("/login");
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts("", pageNumber));
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ]);

    const createProductHandler = (product) => {
        dispatch(createProduct({}));
    };

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button
                        variant="dark"
                        className="my-3"
                        onClick={createProductHandler}
                    >
                        Create Product
                    </Button>
                </Col>
            </Row>
            {errorDelete && <Message message={errorDelete}></Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message message={error} />
            ) : (
                <>
                    <Table
                        striped
                        responsive
                        bordered
                        className="table-sm"
                        hover
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td className="text-center">
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button
                                                variant="light"
                                                className="btn btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn btn-sm"
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate isAdmin={true} page={page} pages={pages} />
                </>
            )}
        </>
    );
};

export default ProductListScreen;
