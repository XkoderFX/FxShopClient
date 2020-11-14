import * as actions from "../actions/types";

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case actions.CART_ADD_ITEM:
            const item = action.payload;
            const doesExists = state.cartItems.find(
                (product) => product._id == item._id
            );

            if (doesExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem._id === doesExists._id ? item : cartItem
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case actions.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.filter(
                        ({ _id }) => _id !== action.payload.id
                    ),
                ],
            };
        case actions.CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        case actions.CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
};
