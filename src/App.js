import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductsDetail from "./components/ProductsDetail";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import ErrorPage from "./pages/Error";
import Category from "./components/Category";
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import "./App.css"
const App = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/productsdetail/:id" element={<ProductsDetail />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/searchproduct/:searchQuery" element={<SearchProduct />} />
      </Routes>
      <Footer /> 
    </>
  );
};

export default App;
