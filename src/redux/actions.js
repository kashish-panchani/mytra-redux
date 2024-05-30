import { ADD_TO_CART, GET_CARTITEMS_COUNT, GET_CART_ITEMS, GET_PRODUCTS, GET_SORTED_PRODUCT, GET_WISHLIST_PRODUCTS, MOVE_TO_CART } from "./constants";

export const getProducts = (payload) => {
    return {
        type: GET_PRODUCTS,
        payload,
    }
};
export const getWishlistProduct = (payload) => {
    return {
        type: GET_WISHLIST_PRODUCTS,
        payload,
    }
};
export const getSortedProduct = (payload) => {
    return {
        type:GET_SORTED_PRODUCT,
        payload,
    }
};
export const getCartItems = (payload) => {
    return {
        type:GET_CART_ITEMS,
        payload,
    }
};
export const addToCart = (payload) => {
    console.log("actionpayload",payload);
    return {
        type:ADD_TO_CART,
        payload,
    }
};

export const moveToCart = (payload) => {
    return {
        type:MOVE_TO_CART,
        payload,
    }
};

export const getCartItemsCount = (payload) => {
    return {
        type:GET_CARTITEMS_COUNT,
        payload,
    }
};



