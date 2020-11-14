import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer, Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import * as actions from "../actions/types";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { userInfo } = useSelector((state) => state.userLogin);
    const {
        loading: updateLoading,
        error: updateError,
        success: updateSuccess,
    } = useSelector((state) => state.userUpdate);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: actions.USER_UPDATE_RESET });
            history.push("/admin/userList");
        } else {
            if (userInfo._id === userId) {
                window.alert("can not edit the current user!");
                history.push("/admin/userList");
                dispatch({ type: actions.USER_UPDATE_RESET });
            }
            if (!user.name || user._id !== userId) {
                // check whether the user is not the current in the user details
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, history, userId, user, updateSuccess, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/userList" className="btn btn-light my-3">
                Go Back
            </Link>

            <FromContainer>
                <h1 style={{ margin: "0", padding: "0" }}>Edit User</h1>
                {updateLoading && <Loader />}
                {updateError && <Message message={error} />}
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
                                        <i className="fas fa-user"></i>
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
                            <Form.Label>Email Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-envelope"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={email}
                                    onChange={({ target }) =>
                                        setEmail(target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                custom
                                type="checkbox"
                                label="Is Admin"
                                id="isAdmin"
                                value={isAdmin}
                                onChange={({ target }) =>
                                    setIsAdmin(target.checked)
                                }
                            />
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

export default UserEditScreen;
