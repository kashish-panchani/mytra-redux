import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { settings } from "../Constants/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProduct, getCartItemsCount, getWishlistProduct } from "../redux/actions";
import Spinner from "../Spinner";

const ProductsDetail = () => {
  const { id: productId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { products, product: foundProduct, wishlist, cartItems, selectedProductId, isFetchProductsLoading } = useSelector(state => state.Reducer)
  localStorage.setItem("cartItems", JSON.stringify(cartItems));


  useEffect(() => {
    if (foundProduct) {
      if (foundProduct?.id !== selectedProductId) {

        dispatch(fetchProduct({ productId }));
      } 
    }
  }, [productId]);

  useEffect(() => {
    dispatch(getCartItemsCount(cartItems?.length))
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    dispatch(getWishlistProduct(savedWishlist))
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== productId)
      : [...wishlist, products];
    dispatch(getWishlistProduct(updatedWishlist))
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast[isInWishlist ? "error" : "success"](
      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      }
    );
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedIn === "true");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (isFetchProductsLoading) {
    return <Spinner />
  }
  if (!products) {
    return <h1>Error</h1>;
  }


  return (
    <>
      <div className="container mx-auto py-20 block md:flex md:justify-center">
        <div className="sm:flex sm:justify-center sm:items-center sm:w-full">
          <div className="mt-16 sm:ml-14 ml-4 sm:text-base text-xs sm:mt-24 absolute top-0 left-0">
            <Link to="/">
              <i className="fa-solid fa-arrow-left  mr-2"></i>

              <label
                htmlFor="selectAll"
                className="ml-1 text-slate-500 font-bold"
              >
                Back
              </label>
            </Link>
          </div>
          <div className="my-12 flex-wrap grid sm:mt-16 md:grid-cols-2 md:p-0 gap-2">
            {isMobile ? (
              <div className="h-[147px] sm:h-[194px] overflow-hidden">
                <Slider {...settings} className="h-32 sm:h-44">
                  {foundProduct?.images?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Product ${index}`}
                        className="w-full h-32 sm:h-44 object-contain"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              foundProduct?.images?.map((image, index) => (
                <div
                  key={index}
                  className="w-full xl:w-[350px] xl:h-[350px] lg:w-[290px] lg:h-[290px] md:w-[200px] md:h-[200px] border "
                >
                  <img
                    src={image}
                    alt="image"
                    className="object-contain w-full h-full"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col px-4 sm:px-16 gap-3 xl:gap-5 lg:gap-4 md:gap-5 sm:gap-3 md:px-0 py-5 md:py-20 xl:w-2/3  md:w-[41%]">
          <div className="flex flex-col gap-2  xl:gap-5 lg:gap-4 md:gap-3 sm:gap-3 ">
            <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-xl text-lg  font-bold">
              {foundProduct?.title}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-base text-sm font-normal">
              {foundProduct?.category}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm font-normal">
              {foundProduct?.description}
            </h1>
            <p className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm leading-relaxed font-normal">
              {foundProduct?.brand}
            </p>
            <div className="border border-gary-200 w-14 text-xs    flex items-center font-bold justify-evenly">
              {foundProduct?.rating}{" "}
              <i className="fa-solid fa-star mt-1 text-xs text-teal-500"></i>
            </div>
            <hr />
          </div>

          <div className=" flex items-center my-1 xl:text-2xl  font-bold text-black">
            <p>
              <span className="xl:text-2xl lg:text-lg md:text-sm sm:text-sm text-xs font-bold">
                ${(foundProduct?.price - (foundProduct?.price * (foundProduct?.discountPercentage / 100))).toFixed(2)}

              </span>
              {foundProduct?.discountPercentage >= 1 && (
                <>
                  <span className="text-xs xl:text-xl lg:text-base md:text-sm sm:text-sm opacity-40 font-normal px-2 leading-relaxed line-through">
                    ${(foundProduct?.price)}
                  </span>
                  <span className=" text-xs xl:text-lg leading-relaxed lg:text-sm md:text-sm sm:text-sm font-bold px-2 text-red-400">
                    ({(foundProduct?.discountPercentage)}% off)
                  </span>
                </>
              )}
            </p>
          </div>
          {foundProduct?.stock < 5 && (
            <p className="text-sm xl:text-xl lg:text-lg md:text-sm sm:text-base leading-relaxed ">
              <label htmlFor="" className="text-teal-600 font-semibold">
                In stock :{" "}
              </label>
              {foundProduct?.stock}
            </p>
          )}


          <div className="text-teal-600 font-bold text-sm xl:text-xl lg:text-base md:text-sm sm:text-sm ">
            inclusive of all taxes
          </div>

          <div className="flex flex-row gap-1 w-60 sm:w-72 h-10 lg:w-96">
            <button
              className="text-[10px] xl:text-base  lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
              onClick={() => {
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                dispatch(addToCart(foundProduct))
              }}
            >
              {cartItems?.some((item) => item?.id === foundProduct?.id) ? (
                <Link to="/cart" className="text-white">
                  GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
                </Link>
              ) : (
                "ADD TO CART"
              )}
            </button>

            {wishlist?.some((item) => item.id === foundProduct?.id) ? (
              <div className="text-[10px] xl:text-base cursor-not-allowed flex justify-center items-center py-1   lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32">
                <i className="fa fa-heart sm:text-base  text-rose-500"></i>
                <span className=" ml-1 font-bold">WISHLISTED</span>
              </div>
            ) : (
              <div
                className="text-[10px] xl:text-base  flex justify-center items-center lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32"
                onClick={(e) => whishlistbtn(foundProduct?.id, e)}
              >
                <i className="fa-regular fa-heart sm:text-sm"></i>
                <span className=" ml-1 font-bold">WISHLIST</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetail;