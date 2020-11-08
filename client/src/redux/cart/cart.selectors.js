import {createSelector} from "reselect";

const selectCart = state => state.cart;

export const selectHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);

export const selectCartItemsPriceTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumulatedPrice, cartItem) => accumulatedPrice + cartItem.quantity * cartItem.price, 0)
);