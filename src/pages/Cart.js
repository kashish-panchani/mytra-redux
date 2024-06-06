import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToast from "../hook/useToast";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, getSelectProductId } from "../redux/actions";

const Cart = () => {
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItemCount, setSelectedItemCount] = useState(0);

  const { success } = useToast();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.Reducer || [])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  useEffect(() => {
    const count = cartItems?.filter((item) => item?.checked).length;
    setSelectedItemCount(count);
    setSelectAll(count === cartItems?.length);
  }, [cartItems, setSelectedItemCount]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      dispatch(getCartItems(parsedCartItems))
    }
  }, []);


  const decrease = (productId) => {
    const updatedCartItems = cartItems?.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    dispatch(getCartItems(updatedCartItems));
  };


  const removeFromCart = (productsToRemove) => {
    let updatedCartItems;
    if (Array.isArray(productsToRemove)) {
      updatedCartItems = cartItems?.filter(
        (item) => !productsToRemove.some((product) => product.id === item.id)
      );
    } else {
      updatedCartItems = cartItems?.filter(
        (item) => item.id !== productsToRemove.id
      );
    }
    dispatch(getCartItems(updatedCartItems))

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleClearCart = () => {
    const selectedItemsToRemove = cartItems?.filter((item) => item?.checked);
    const updatedCartItems = cartItems?.filter((item) => !item?.checked);
    dispatch(getCartItems(updatedCartItems))
    removeFromCart(selectedItemsToRemove);
    success("Selected items removed from cart");
    closeClearModal();
  };

  const handleItemCheckboxChange = (productId) => {
    const updatedCartItems = cartItems?.map((item) =>
      item.id === productId ? { ...item, checked: !item?.checked } : item
    );

    dispatch(getCartItems(updatedCartItems));

    const allItemsSelected = updatedCartItems?.every((item) => item?.checked);
    setSelectAll(allItemsSelected);
  };

  const handleCheckboxChange = () => {
    const allItemsChecked = cartItems?.every((item) => item?.checked);
    const updatedCartItems = cartItems?.map((item) => ({
      ...item,
      checked: !allItemsChecked,
    }));

    dispatch(getCartItems(updatedCartItems));

    setSelectAll(!allItemsChecked);
    setSelectedItemCount(!allItemsChecked ? 0 : cartItems?.length);
  };


  const increase = (productId) => {
    const updatedCartItems = cartItems?.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.min(item?.quantity + 1, 10) }
        : item
    );

    dispatch(getCartItems(updatedCartItems));
  };

  const cartClose = (itemToRemove) => {
    setItemToRemove(itemToRemove);
  };


  const handleRemove = () => {
    const updatedCartItems = cartItems?.filter((item) => item !== itemToRemove);
    dispatch(getCartItems(updatedCartItems))
    removeFromCart(itemToRemove);
    success("Product removed from cart");
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
  };
  const openClearModal = () => {
    setShowClearModal(true);
  };
  const closeClearModal = () => {
    setShowClearModal(false);
  };
  return (
    <div className="container mx-auto xl:p-10 lg:p-12 md:p-10 sm:p-10 py-16">
      {cartItems?.length === 0 ? (
        <div className=" text-center px-6">
          <div className="flex justify-center items-center">
            <img
              src="../empty.svg"
              alt=""
              className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
            />
          </div>
          <div>
            <p className="font-bold text-base sm:text-2xl pb-2">
              Hey,it feels so light!
            </p>
            <p className="sm:text-base md:text-lg text-xs text-gray-400">
              There is nothing in your cart.Let's add some items.
            </p>
          </div>
          <div>
            <Link to="/wishlist">
              <button className="border border-blue-800  rounded-md py-3 px-3 text-[10px] sm:text-sm sm:px-6 sm:py-5 md:px-8 md:py-5 md:text-xl xl:px-10 xl:text-lg xl:py-4 m-10 text-blue-600 font-bold">
                ADD ITEMS FROM WISHLIST
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            className="mt-8
           ml-2 sm:ml-0 sm:mt-20"
          >
            <Link to="/">
              <i className="fa-solid fa-arrow-left  sm:text-base  text-xs mr-1"></i>

              <label
                htmlFor="selectAll"
                className="ml-1 sm:text-base text-xs text-slate-500 font-bold"
              >
                Back
              </label>
            </Link>
          </div>
          <div className="my-7 flex justify-between items-center">
            <div className="flex xl:ml-[110px] sm:ml-4 ml-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleCheckboxChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="selectAll"
                className="ml-1 text-[10px] sm:text-xs text-slate-500 font-bold"
              >
                {selectedItemCount}/{cartItems?.length} ITEMS SELECTED
              </label>
            </div>
            <button
              className="rounded-md xl:mr-24 mr-3 text-[10px] sm:text-xs text-slate-500 font-bold"
              onClick={openClearModal}
              disabled={selectedItemCount === 0}
            >
              REMOVE
            </button>
          </div>
          {showClearModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
                <p className="text-xs sm:text-base font-semibold mb-4">
                  Are you sure you want to remove all items from cart.
                </p>
                <hr />
                <div className="flex justify-between items-center text-[10px] sm:text-xs mx-8 mt-2 font-semibold">
                  <button
                    className="text-red-600 rounded-lg"
                    onClick={handleClearCart}
                    disabled={selectedItemCount === 0}
                  >
                    REMOVE
                  </button>
                  |
                  <button
                    className="text-black rounded-lg"
                    onClick={closeClearModal}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-2 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartItems?.map((item, index) => (
                <div key={index}>
                  <div className="responsive bottom-2 flex justify-between mb-1 sm:mb-2 border bg-white sm:p-4 p-2">
                    <input
                      type="checkbox"
                      checked={item?.checked}
                      onChange={() => handleItemCheckboxChange(item?.id)}
                      className="absolute mt-5 sm:mt-0 sm:p-1 cursor-pointer"
                    />
                     <Link to={`/productsdetail/${item?.id}`}>
                    <img
                      src={item?.thumbnail}
                      alt="product-image"
                      className="w-[100px] h-[100px] xl:w-44 lg:w-36 mt-5 sm:mt-0 md:w-32 sm:w-40 object-cover sm:object-contain xl:h-44 lg:h-36 md:h-32 sm:h-40"
                      onClick={()=>dispatch(getSelectProductId(item.id))}
                    />
                    </Link>

                    <div className="ml-4 flex md:w-[70%] gap- sm:w-[66%] w-[100%] sm:justify-between">
                      <div className="mt-3">
                       
                          <h2 className="text-[12px] sm:text-base font-semibold text-gray-600" >
                            {item?.title}
                            
                          </h2>
                
                        <p className="my-2 text-[12px] sm:text-[13px] text-gray-700">
                          {item?.category}
                        </p>
                        <p className="my-2 text-[11px] sm:text-[13px] line-clamp-1 text-gray-700">
                          {item?.description}
                        </p>


                        <div className=" sm:mb-3 flex items-center justify-between">
                          <p>
                            <span className="text-[10px] sm:text-sm font-bold leading-relaxed">
                              ${(item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)}

                            </span>
                            {item.discountPercentage >= 1 && (
                              <>
                                <span className="font-semibold text-[10px] sm:text-xs mx-2 line-through text-gray-400">
                                  ${(item.price)}
                                </span>
                                <span className="text-[10px] sm:text-xs sm:mt-0  mt-4 leading-relaxed sm:font-bold text-orange-300">
                                  ({(item.discountPercentage)}% off)
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center mt-2 border-gray-100">
                          <span
                            className={`border bg-slate-200 w-3 h-4 text-[10px] px-1 xl:px-2 xl:w-6 xl:h-6 xl:text-sm lg:w-5 lg:h-5 lg:px-2 lg:text-[13px] md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-3 sm:h-5 sm:px-2 sm:text-[12px] hover:bg-slate-100  ${item?.quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                              }`}
                            disabled={item?.quantity <= 1}
                            onClick={() => decrease(item?.id)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span className="w-4 h-4 text-[10px] xl:w-6 xl:h-6 xl:py-0 lg:w-5 lg:h-5 lg:px-1 lg:text-[12px] lg:py-0 md:h-4 md:w-4 md:text-[10px] md:px-1 md:py-0 sm:text-[10px] sm:px-[2px] sm:py-[2px] sm:h-5 border bg-white text-center xl:text-base">
                            {item?.quantity}
                          </span>
                          <span
                            className={`border bg-slate-200 w-3 h-4 text-[10px] px hover:bg-slate-100 xl:px-1 xl:w-6 xl:text-sm xl:h-6 lg:w-5 lg:h-5 lg:px-1 lg:text-[13px] md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-4 sm:h-5 sm:px-1 sm:text-[12px] ${item?.quantity >= 10 ? "cursor-not-allowed" : "cursor-pointer"
                              }`}
                            disabled={item?.quantity >= 10}
                            onClick={() => increase(item?.id)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div className="absolute right-2 sm:relative mt-[22px] sm:right-3 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="sm:absolute">
                          <button
                            className="text-[13px] xl:text-xl lg:text-base md:text-sm sm:text-[13px]"
                            onClick={() => {
                              cartClose(item);
                            }}
                          >
                            <i className="fa-solid fa-xmark "></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/wishlist">
                <div className="border text-xs  bg-white sm:text-sm p-4 hover:underline flex justify-between items-center font-semibold">
                  <div className="flex">
                    <i className="fa-regular fa-bookmark mr-2 text-sm"></i>
                    <h1> Add More From Wishlist</h1>
                  </div>

                  <div>
                    <i className="fa-solid fa-greater-than text-[10px] md:text-xs"></i>
                  </div>
                </div>
              </Link>
            </div>
            <div className="my-1 sm:my-0 sm:mt-6 h-full gap-2 grid grid-cols-1 border bg-white py-6 px-4 md:mt-0 md:w-80">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700  font-bold">Subtotal</p>
                <p className="text-gray-700 text-sm">$
                  {cartItems?.reduce(
                    (total, item) =>
                      total +
                      item?.quantity *
                      (parseInt(item?.price -
                        (item?.price * item?.discountPercentage) / 100)),
                    0
                  )}</p>
              </div>
              <div className="flex justify-between text-gray-700 ">
                <p className="text-[15px]">Shipping</p>
                <p className="-[15px]">Free</p>
              </div>
              <div className="flex justify-between text-gray-700">
                <p className=" text-[15px]">Platform fee:</p>
                <p className=" text-[15px]">Free</p>
              </div>
              <hr className="" />
              <div className="flex justify-between">
                <p className="text-base font-bold">Total Amount:</p>

                <p className="mb-1 text-sm font-bold">
                  {" "}
                  $
                  {cartItems?.reduce(
                    (total, item) =>
                      total +
                      item?.quantity *
                      parseInt(
                        (item?.price -
                          (item?.price * item?.discountPercentage) / 100
                        )),
                    0
                  )}
                </p>
                {itemToRemove && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
                      <p className="text-xs sm:text-base font- mb-4">
                        Are you sure you want to remove this item from the cart?
                      </p>
                      <hr />
                      <div className="flex justify-between items-center text-[11px] sm:text-base mx-8 mt-2 font-semibold">
                        <button
                          className=" text-rose-500  rounded-lg "
                          onClick={handleRemove}
                        >
                          Remove
                        </button>
                        |
                        <button
                          className=" text-black rounded-lg"
                          onClick={handleCancelRemove}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

