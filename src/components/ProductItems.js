import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { settings } from "../Constants/ProductSlider";
import { getSelectProductId } from "../redux/actions";
import { useDispatch } from "react-redux";

const ProductItems = (props) => {
  const {
    isMobile,
    setIshover,
    setIsHoverSetProduct,
    isHoverSetProduct,
    isHover,
    wishlist,
    whishlistbtn,
    sortedProducts,
    sortedProduct
  } = props;
const dispatch=useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
      <div className="flex justify-end">
        <div
          className="border border-slate-200 sm:mb-8 mr-2 my-4
        "
        >
          <label className="p-2 text-xs sm:text-[13px] text-gray-500 ">
            Sort by:
          </label>
          <select
            className="p-[10px] sm:p-2 w-[245px] font-bold text-xs text-gray-500 sm:text-[13px] sm:w-[12rem] outline-none bg-white"
            onChange={(e) => sortedProducts(e.target.value)}
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
                  <Link to={`/ProductsDetail/${product.id}`}>
                    <div className="w-full h-32 sm:h-44">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-32 sm:h-44 object-contain"
                        onClick={()=>dispatch(getSelectProductId(product.id))}
                      />
                    </div>
                  </Link>
                  <div className="p-1">
                    <h2 className="text-xs sm:text-lg font-bold line-clamp-1 text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-[10px]  sm:text-xs line-clamp-1 mt-2 text-gray-600">
                      {product.description}
                    </p>

                    <div className="flex justify-between mt-0 sm:mt-2">
                      <div className="mb-2 sm:mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-[8px] sm:text-sm font-bold leading-relaxed">
                            ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}

                          </span>
                          {product.discountPercentage >= 1 && (
                            <>
                              <span className="font-semibold text-[8px] sm:text-xs mx-2 line-through text-gray-400">
                                ${(product.price)}
                              </span>
                              <span className="text-[8px] leading-relaxed sm:font-bold text-orange-300">
                                ({(product.discountPercentage)}% off)
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      {/* Wishlist button FOR MOBILE*/}
                      <div className="rounded-full cursor-pointer text-center px-1">
                        {wishlist?.some((item) => item.id === product.id) ? (
                          <div className=" flex p-1 justify-center items-center w-full">
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
              onMouseOver={() => {
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
                        <div key={index}>
                          <img
                            src={image}
                            alt={`Product ${index}`}
                            className="w-full h-32 sm:h-44 object-contain"
                            loading="lazy"
                            onClick={()=>dispatch(getSelectProductId(product.id))}
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
                <div className="p-3 none">
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

                  <div className="flex justify-start text-xs pt-3 text-gray-600">
                    <span>Category: {product.category}</span>
                  </div>
                </div>
              ) : (
                <div className="p-2 block sm:p-[11px]">
                  <Link to={`/productsdetail/${product.id}`}>
                    <h2 className="text-xs capitalize sm:text-sm font-bold line-clamp-1 text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-xs line-clamp-1 md:line-clamp-2 mt-2 text-gray-500">
                      {product.description}
                    </p>
                  </Link>

                </div>
              )}
              <div className="pl-3 mb-2 sm:mb-5 flex items-center justify-between">
                <p>
                  <span className="text-[9px] sm:text-sm font-bold leading-relaxed">
                    ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}

                  </span>
                  {product.discountPercentage >= 1 && (
                    <>
                      <span className="font-semibold text-[9px] sm:text-xs mx-2 line-through text-gray-400">
                        ${(product.price)}
                      </span>
                      <span className="text-[8px] leading-relaxed sm:font-bold text-orange-300">
                        ({(product.discountPercentage)}% off)
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductItems;
