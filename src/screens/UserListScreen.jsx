import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers, register } from "../actions/userActions";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector((state) => state.userList);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { success: successDelete } = useSelector((state) => state.userDelete);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message message={error} />
            ) : (
                <Table striped responsive bordered className="table-sm" hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td className="text-center">
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        >
                                            {" "}
                                        </i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td className="text-center">
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
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
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
