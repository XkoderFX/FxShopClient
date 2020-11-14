import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers, register } from "../actions/userActions";
import FromContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.orderList);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { success: successDelete } = useSelector((state) => state.userDelete);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push("/login");
        }
    }, [dispatch, history]);

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message message={error} />
            ) : (
                <Table striped responsive bordered className="table-sm" hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td className="text-center">
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td className="text-center">
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td className="text-center">
                                    <LinkContainer to={`/order/${order._id}/`}>
                                        <Button
                                            variant="light"
                                            className="btn btn-sm"
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
