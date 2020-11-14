import axios from "axios";
import * as actions from "./types";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: actions.CART_ADD_ITEM, payload: { ...data, quantity } });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: actions.CART_REMOVE_ITEM, payload: { id } });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: actions.CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: actions.CART_SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem("paymentMethod", data);
};
