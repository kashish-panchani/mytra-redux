import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { settings } from "../Constants/ProductSlider.js";
import useToast from "../hook/useToast.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSortedProduct, getWishlistProduct } from "../redux/actions.js";

const Category = () => {
  const { type } = useParams();
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [filterCategoryProducts, setfilterCategoryProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const { products, wishlist, sortedProduct } = useSelector(state => state.Reducer)
  const { success, error } = useToast();
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      dispatch(getProducts(data.products))
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    sortedProducts("default");
  }, [type]);

  useEffect(() => {
    if (filterCategoryProducts?.length > 0) {
      dispatch(getSortedProduct([...filterCategoryProducts]))
    }
  }, [filterCategoryProducts]);
  const sortedProducts = (value) => {
    setSelectedSortOption(value);
    switch (value) {
      case "better_discount":
        dispatch(getSortedProduct(
          [...filterCategoryProducts].sort(
            (a, b) =>
              b.price -
              (b.price * b.discountPercentage) / 100 -
              (a.price - (a.price * a.discountPercentage) / 100)
          )
        ))
        break;
      case "price_high_to_low":
        dispatch(getSortedProduct([...filterCategoryProducts].sort(
          (a, b) =>
            b.price -
            (b.price * b.discountPercentage) / 100 -
            (a.price - (a.price * a.discountPercentage) / 100)
        )))
       
        break;
      case "price_low_to_high":
        dispatch(getSortedProduct([...filterCategoryProducts].sort(
          (a, b) =>
            a.price -
            (a.price * a.discountPercentage) / 100 -
            (b.price - (b.price * b.discountPercentage) / 100)
        )))
        break;
      case "customer_rating":
        dispatch(getSortedProduct([...filterCategoryProducts].sort((a, b) => b.rating - a.rating)))
        break;
      default:
        dispatch(getSortedProduct([...filterCategoryProducts]))
        break;
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);


  useEffect(() => {
    // const category = products?.filter((product) => product?.category === type);
    const category = Array.isArray(products) ? products.filter((product) => product?.category === type) : [];

    setfilterCategoryProducts(category);
    window.scrollTo(0, 0);
  }, [products, type]);

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

  return (
    <>
      <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
        <div className="flex justify-end">
          <div className="border border-slate-200 sm:mb-8 mr-2 m-2">
            <label className="p-2 text-xs sm:text-[13px] text-gray-500 ">
              Sort by:
            </label>
            <select
              className="p-[10px] sm:p-2 w-[245px] font-bold text-xs text-gray-500 sm:text-[13px] sm:w-[12rem] outline-none bg-white"
              onChange={(e) => sortedProducts(e.target.value)}
              value={selectedSortOption}
            >
              <option value="default">Recommended</option>
              <option value="better_discount">Better Discount</option>
              <option value="price_high_to_low">Price: High To Low</option>
              <option value="price_low_to_high">Price: Low To High</option>
              <option value="customer_rating">Customer Rating</option>
            </select>
          </div>
        </div>
        {isMobile ? (
          <section className="py-0">
            <div className="container">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
                {sortedProduct?.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white sm:rounded-lg hover:shadow-xl  shadow-sm  overflow-hidden"
                  >
                    <Link to={`/Productsdetail/${product.id}`}>
                      <div className=" w-full h-32 sm:h-44">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-32 sm:h-44 object-contain"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <h2 className="text-xs sm:text-lg font-bold line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-[10px]  sm:text-xs line-clamp-1 mt-2 text-gray-600">
                        {product.description}
                      </p>

                      <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                          <span className="text-[10px] sm:text-sm font-bold text-gray-800">
                            ${parseInt(product.price - ((product.price * product.discountPercentage) / 100))}
                          </span>
                          <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                            ${parseInt(product.price)}
                          </span>
                          <span className="text-[8px] sm:text-xs leading-relaxed text-orange-300">
                            ({parseInt(product.discountPercentage)}% off)
                          </span>
                        </div>
                        {/* Wishlist button for mobile*/}
                        <div className="rounded-full cursor-pointer text-center px-1">
                          {wishlist?.some((item) => item.id === product.id) ? (
                            <div className=" flex p-1 justify-center items-center w-full ">
                              <i className="fa fa-heart text-sm text-rose-500"></i>
                            </div>
                          ) : (
                            <div
                              className="flex p-1 justify-center items-center w-full"
                              onClick={(e) => whishlistbtn(product.id, e)}
                            >
                              <i className="fa-regular fa-heart text-sm"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
            {sortedProduct?.map((product) => (
              <div
                key={product.id}
                className="sm:p-0 bg-white sm:rounded-lg hover:shadow-xl overflow-hidden"
                onMouseEnter={() => {
                  setIshover(true);
                  setIsHoverSetProduct(product.id);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                  setIsHoverSetProduct(null);
                }}
              >
                <div className="h-[147px] sm:h-[194px] overflow-hidden">
                  {isHoverSetProduct === product.id && isHover ? (
                    <Link to={`/productsdetail/${product.id}`}>
                      <Slider {...settings} className="h-32 sm:h-44">
                        {product.images.map((image, index) => (
                          <div key={index} className="bg-white">
                            <img
                              src={image}
                              alt={`Product ${index}`}
                              className="w-full h-32 sm:h-44 object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </Slider>
                    </Link>
                  ) : (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-32 sm:h-44 object-contain"
                      loading="lazy"
                    />
                  )}
                </div>

                {isHoverSetProduct === product.id && isHover ? (
                  <div className="p-2 sm:p-4">
                    <div className="rounded-full cursor-pointer text-center px-1">
                      {wishlist?.some((item) => item.id === product.id) ? (
                        <div className="border flex px-20 p-1 justify-center items-center w-full">
                          <i className="fa fa-heart text-sm text-rose-500"></i>
                          <span className="text-[10px] ml-1 font-bold">
                            WISHLISTED
                          </span>
                        </div>
                      ) : (
                        <div
                          className="border flex px-20 p-1 justify-center items-center w-full"
                          onClick={(e) => whishlistbtn(product.id, e)}
                        >
                          <i className="fa-regular fa-heart text-sm"></i>
                          <span className="text-[10px] ml-1 font-bold">
                            WISHLIST
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-start text-xs py-3 text-gray-600">
                      <span>Category: {product.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px] sm:text-sm font-bold text-gray-800">
                        ${parseInt(product.price - ((product.price * product.discountPercentage) / 100))}
                      </span>
                      <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                        ${parseInt(product.price)}
                      </span>
                      <span className="text-[8px] sm:text-xs leading-relaxed text-orange-300">
                        ({parseInt(product.discountPercentage)}% off)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 sm:p-4">
                    <Link to={`/productsdetail/${product.id}`}>
                      <h2 className="text-xs capitalize sm:text-sm font-bold line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-xs line-clamp-1 md:line-clamp-2 mt-2 text-gray-500">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex items-center">
                      <span className="text-[10px] sm:text-sm font-bold text-gray-800">
                        ${parseInt(product.price - ((product.price * product.discountPercentage) / 100))}
                      </span>
                      <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                        ₹{parseInt(product.price)}
                        
                      </span>
                      <span className="text-[8px] sm:text-xs leading-relaxed text-orange-300">
                        ({parseInt(product.discountPercentage)}% off)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
