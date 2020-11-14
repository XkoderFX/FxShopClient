import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopReducer,
} from "./reducers/productsReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userReducer,
    userRegistrationReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from "./reducers/userReducer";
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer,
} from "./reducers/orderReducers";
import { DESTROY_STORE } from "./actions/types";

const appReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopReducer,
    cart: cartReducer,
    userLogin: userReducer,
    userList: userListReducer,
    userRegister: userRegistrationReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_STORE) {
        state = undefined; // reset the entire store
    }
    return appReducer(state, action);
};

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
const paymentMethod = localStorage.getItem("paymentMethod");

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethod,
    },
    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
