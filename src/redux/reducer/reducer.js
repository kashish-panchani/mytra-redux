import { ADD_TO_CART, FETCH_PRODUCTS_LOADING, GET_CARTITEMS_COUNT, GET_CART_ITEMS, GET_PRODUCT, GET_PRODUCTS, GET_SELECT_PRODUCT_ID, GET_SORTED_PRODUCT, GET_WISHLIST_PRODUCTS, MOVE_TO_CART } from "../constants";
const initialState = {
    products: [],
    wishlist: [],
    product: {},
    sortedProduct: [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    cartItemsCount: 0,
    selectedProductId: null,
    isFetchProductsLoading: false
};

const Reducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
            };
        case GET_WISHLIST_PRODUCTS:
            return {
                ...state,
                wishlist: payload,

            };
        case GET_SORTED_PRODUCT:
            return {
                ...state,
                sortedProduct: payload,

            };
        case GET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,

            };
        case GET_CARTITEMS_COUNT:
            return {
                ...state,
                cartItemsCount: payload,

            };

        case ADD_TO_CART:
            const isAlreadyInCart = state?.cartItems?.some((item) => item?.id === payload?.id);
            const productWithQuantity = { ...payload, quantity: 1, checked: true };
            if (!isAlreadyInCart) {
                const updatedCartItems = [...state.cartItems, productWithQuantity];
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return {
                    ...state,
                    cartItems: updatedCartItems,
                    cartItemsCount: state.cartItemsCount + 1
                };
            }
            return state;
        case MOVE_TO_CART:

            const isInCart = state.cartItems.some((item) => item.id === payload.id);

            if (isInCart) {
                const updatedCartItems = state.cartItems.map((item) =>
                    item.id === payload.id
                        ? { ...item, quantity: item.quantity + 1, checked: true }
                        : item
                );
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return { ...state, cartItems: updatedCartItems };
            } else {
                const updatedCartItems = [
                    ...state.cartItems,
                    { ...payload, quantity: 1, checked: true },
                ];
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return { ...state, cartItems: updatedCartItems };
            }

        case GET_SELECT_PRODUCT_ID:
            return {
                ...state,
                selectedProductId: payload
            }

        case FETCH_PRODUCTS_LOADING:
            return {
                ...state,
                isFetchProductsLoading: payload
            }
        default:

            return state;
    }
};

export default Reducer;
