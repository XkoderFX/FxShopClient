import axios from "axios";
import * as action from "./types";

export const listProducts = (keyword = "", pageNumber = 0) => async (
    dispatch
) => {
    try {
        dispatch({ type: action.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );
        dispatch({ type: action.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: action.PRODUCT_LIST_FAIL, payload: error });
    }
};

export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: action.PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: action.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: action.PRODUCT_DETAILS_FAIL, payload: error });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: action.PRODUCT_DELETE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`/api/products/${id}`, config);
        dispatch({ type: action.PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: action.PRODUCT_DELETE_FAIL, payload: error });
    }
};

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: action.PRODUCT_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`/api/products/`, product, config);
        dispatch({ type: action.PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: action.PRODUCT_CREATE_FAIL, payload: error });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: action.PRODUCT_UPDATE_REQUEST });
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
            `/api/products/${product._id}`,
            product,
            config
        );
        dispatch({ type: action.PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: action.PRODUCT_UPDATE_FAIL, payload: error });
    }
};

export const createReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: action.PRODUCT_CREATE_REVIEW_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post(`/api/products/${id}/reviews`, review, config);
        dispatch({ type: action.PRODUCT_CREATE_REVIEW_SUCCESS, success: true });
    } catch (error) {
        dispatch({
            type: action.PRODUCT_CREATE_REVIEW_FAIL,
            payload: error,
        });
    }
};

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: action.PRODUCT_TOP_REQUEST });
        const { data } = await axios.get(`/api/products/top`);
        dispatch({ type: action.PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: action.PRODUCT_TOP_FAIL, payload: error });
    }
};
