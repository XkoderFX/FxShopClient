import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer, Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import * as actions from "../actions/types";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );

    const {
        loading: updateLoading,
        error: updateError,
        success: updateSuccess,
    } = useSelector((state) => state.productUpdate);

    const { userInfo } = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: actions.PRODUCT_UPDATE_RESET });
            history.push("/admin/productList");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductsDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, history, productId, product, updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                category,
                brand,
                countInStock,
                description,
            })
        );
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);
            setImage(data);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Link to="/admin/productList" className="btn btn-light my-3">
                Go Back
            </Link>

            <FromContainer>
                <h1 style={{ margin: "0", padding: "0" }}>Edit Product</h1>
                {updateLoading && <Loader />}
                {updateError && <Message message={updateError} />}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message message={error} />
                ) : (
                    <Form className="py-3" onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-signature"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={({ target }) =>
                                        setName(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-money-check"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={({ target }) =>
                                        setPrice(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-image"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    onChange={({ target }) =>
                                        setImage(target.value)
                                    }
                                />
                            </InputGroup>

                            <Form.File
                                id="image-file"
                                onChange={uploadFileHandler}
                                custom
                                label="Choose a file"
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-copyright"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={({ target }) =>
                                        setBrand(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-tags"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={({ target }) =>
                                        setCategory(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Count In Stock</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-box-open"></i>{" "}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Count In Stock"
                                    value={countInStock}
                                    onChange={({ target }) =>
                                        setCountInStock(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-audio-description"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={({ target }) =>
                                        setDescription(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Button type="submit" variant="dark">
                            Edit
                        </Button>
                    </Form>
                )}
            </FromContainer>
        </>
    );
};

export default ProductEditScreen;
