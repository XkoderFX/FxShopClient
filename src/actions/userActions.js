import axios from "axios";
import * as actions from "../actions/types";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_LOGIN_FAIL, payload: message });
    }
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/",
            { email, name, password },
            config
        );

        dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_REGISTER_FAIL, payload: message });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_DETAILS_FAIL, payload: message });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.patch(`/api/users/profile`, user, config);
        dispatch({ type: actions.USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_UPDATE_PROFILE_FAIL, payload: message });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/`, config);
        dispatch({ type: actions.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_LIST_FAIL, payload: message });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);
        dispatch({ type: actions.USER_DELETE_SUCCESS, success: true });
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_DELETE_FAIL, payload: message });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_UPDATE_REQUEST });

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
            `/api/users/${user._id}/edit`,
            user,
            config
        );
        dispatch({ type: actions.USER_UPDATE_SUCCESS, success: true });
        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.error;
        dispatch({ type: actions.USER_DELETE_FAIL, payload: message });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
    dispatch({ type: actions.USER_LOGOUT });
    dispatch({ type: actions.USER_DETAILS_RESET });
    dispatch({ type: actions.ORDER_LIST_MY_RESET });
    dispatch({ type: actions.DESTROY_STORE });
};
