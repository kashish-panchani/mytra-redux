import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItems from "./ProductItems";
import useToast from "../hook/useToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getProducts, getSortedProduct, getWishlistProduct } from "../redux/actions";
import Spinner from "../Spinner";

const SearchProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const { searchQuery } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { success, error } = useToast();
  const dispatch = useDispatch()
  const { products ,wishlist ,sortedProduct,isFetchProductsLoading} = useSelector(state => state.Reducer)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    if (filteredProducts.length > 0) {
      dispatch(getSortedProduct([...filteredProducts]))
    }
  }, [filteredProducts]);
  const sortedProducts = (value) => {
    switch (value) {
      case "better_discount":
        dispatch(getSortedProduct( [...filteredProducts].sort(
          (a, b) =>
            b.price -
            (b.price * b.discountPercentage) / 100 -
            (a.price - (a.price * a.discountPercentage) / 100)
        )))
       
        break;
      case "price_high_to_low":
        dispatch(getSortedProduct( [...filteredProducts].sort(
          (a, b) =>
            b.price -
            (b.price * b.discountPercentage) / 100 -
            (a.price - (a.price * a.discountPercentage) / 100)
        )))
       
        break;
      case "price_low_to_high":
        dispatch(getSortedProduct( [...filteredProducts].sort(
          (a, b) =>
            a.price -
            (a.price * a.discountPercentage) / 100 -
            (b.price - (b.price * b.discountPercentage) / 100)
        )))
        
        break;
      case "customer_rating":
        dispatch(getSortedProduct([...filteredProducts].sort((a, b) => b.rating - a.rating)))
        break;
      default:
        dispatch(getSortedProduct([...filteredProducts]))
        break;
    }
  };
  useEffect(() => {
    const filtered = products?.filter((product) =>
      product?.title.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      dispatch(getWishlistProduct(JSON.parse(savedWishlist)))
    }
  }, []);
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const isInWishlist = wishlist?.some((item) => item.id === productId);
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      dispatch(getWishlistProduct(updatedWishlist))
      error("Removed from wishlist");

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = products.find(
        (product) => product.id === productId
      );
      if (updatedWishlist) {
        dispatch(getWishlistProduct([...wishlist, updatedWishlist]))
        success("Added to wishlist");
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, updatedWishlist])
        );
      }
    }
  };
  if (isFetchProductsLoading) {
    return <Spinner />
  }
  return (
    <div>
      <div className="container mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
            No products found
          </div>
        ) : (
          <ProductItems
            setIshover={setIshover}
            setIsHoverSetProduct={setIsHoverSetProduct}
            isHoverSetProduct={isHoverSetProduct}
            isHover={isHover}
            wishlist={wishlist}
            whishlistbtn={whishlistbtn}
            isMobile={isMobile}
            sortedProducts={sortedProducts}
            sortedProduct={sortedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
