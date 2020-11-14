import axios from "axios";
import * as actions from "./types";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post("/api/orders", order, config);
        dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.ORDER_CREATE_FAIL, payload: error });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DETAILS_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.ORDER_DETAILS_FAIL, payload: error });
    }
};

export const payOrder = (orderId, paymentResult) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: actions.ORDER_PAY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.patch(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        );
        dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.ORDER_PAY_FAIL, payload: error });
    }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DELIVER_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.patch(
            `/api/orders/${orderId}/deliver`,
            {},
            config
        );
        dispatch({ type: actions.ORDER_DELIVER_SUCCESS, success: true });
    } catch (error) {
        dispatch({ type: actions.ORDER_DELIVER_FAIL, payload: error });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_LIST_MY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`/api/orders/myorders`, config);
        dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.ORDER_LIST_MY_FAIL, payload: error });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_LIST_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`/api/orders/`, config);
        dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.ORDER_LIST_FAIL, payload: error });
    }
};
