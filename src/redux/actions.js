import { ADD_TO_CART, FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCTS_LOADING, GET_CARTITEMS_COUNT, GET_CART_ITEMS, GET_PRODUCT, GET_PRODUCTS, GET_SELECT_PRODUCT_ID, GET_SORTED_PRODUCT, GET_WISHLIST_PRODUCTS, MOVE_TO_CART } from "./constants";

export const fetchProducts = () => ({
    type: FETCH_PRODUCTS,
});
export const fetchProduct = (payload) => (
    {
        type: FETCH_PRODUCT,
        payload
    });
export const getProducts = (payload) => ({
    type: GET_PRODUCTS,
    payload,
});
export const getProduct = (payload) => ({
    type: GET_PRODUCT,
    payload,
});
export const getWishlistProduct = (payload) => {
    return {
        type: GET_WISHLIST_PRODUCTS,
        payload,
    }
};
export const getSortedProduct = (payload) => {
    return {
        type: GET_SORTED_PRODUCT,
        payload,
    }
};
export const getCartItems = (payload) => {
    return {
        type: GET_CART_ITEMS,
        payload,
    }
};
export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload,
    }
};

export const moveToCart = (payload) => {
    return {
        type: MOVE_TO_CART,
        payload,
    }
};

export const getCartItemsCount = (payload) => {
    return {
        type: GET_CARTITEMS_COUNT,
        payload,
    }
};


export const getSelectProductId = (payload) => {
    return {
        type: GET_SELECT_PRODUCT_ID,
        payload,
    }
};



export const fetchProductsLoading = (payload) => {
    return {
        type: FETCH_PRODUCTS_LOADING,
        payload,
    }
};
