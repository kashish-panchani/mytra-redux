import { put, call, takeLatest } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { fetchProductsLoading, getProduct, getProducts } from './actions';
import { FETCH_PRODUCT, FETCH_PRODUCTS } from './constants';

function* fetchProducts() {
    try {
        yield put(fetchProductsLoading(true));
        const response = yield call(fetch, 'https://dummyjson.com/products?limit=0');
        const data = yield response.json();
        const reversedProducts = data.products.reverse();
        yield put(getProducts(reversedProducts));
        yield put(fetchProductsLoading(false));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function* fetchProduct(action) {
    const { payload } = action;
    try {
        yield put(fetchProductsLoading(true));
        const response = yield call(fetch, `https://dummyjson.com/products/${payload.productId}`);
        const data = yield response.json();
        yield put(getProduct(data));
        yield put(fetchProductsLoading(false));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function* watchFetchProducts() {
    yield takeLatest(FETCH_PRODUCTS, fetchProducts);
    yield takeLatest(FETCH_PRODUCT, fetchProduct);
}

export default function* rootSaga() {
    yield all([
        watchFetchProducts(),

    ]);
}
