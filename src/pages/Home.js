import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { brandimgs, offerimg } from "../Constants/home";
import footerimg from "../Images/home/footeimage.webp";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <div>
          <Link to="/all">
            <div className="sm:flex pt-20 hidden  justify-center items-center ">
              <div>
                <img src="/images/home/heroooo.webp" alt="hero image" />
              </div>
            </div>
          </Link>

          <Link to="/all">
            <div className="flex pt-20 sm:hidden justify-center max-w-full items-center ">
              <div>
                <img
                  src="/images/home/herosec.jpg"
                  alt="heroimg"
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
          <div>
            <img src="/images/home/coupn.webp" alt="coupnimg" />
          </div>

          <div className="flex justify-center items-center sm:mx-2 lg:mx-3">
            <div>
              <img src="/images/home/home3.webp" alt="offer" />
            </div>
            <div>
              <img src="/images/home/home5.webp" alt="offer" />
            </div>
          </div>

          <div className="flex">
            <img src="/images/home/third.webp" alt="deal" />
          </div>
        </div>

        {brandimgs.map((el, index) => (
          <div key={index}>
            <h1 className="flex justify-center items-start py-10 text-sm  sm:text-2xl font-semibold overflow-hidden ">
              {el.title}{" "}
            </h1>

            <div className="grid grid-cols-2 mx-2 sm:grid-cols-3 md:grid-cols-4 max-w-full lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 overflow-hidden bg-white">
              {el.brands.map((el) => (
                <Link to={el.url} key={el.id}>
                  <div className="flex h-full object-cover overflow-hidden">
                    <img src={el.img} alt="brand" className="w-full" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {offerimg.map((el, index) => (
          <div key={index}>
            <h1 className="py-10 text-sm sm:text-2xl text-center font-semibold">
              {el.title}
            </h1>

            <div className="overflow-hidden sm:mx-5 md:mx-6 lg:mx-8 xl:mx-11">
              <div className="grid mx-4 sm:mx-2 sm:grid-cols-2 gap-2 sm:gap-4">
                {el.offers.map((el) => (
                  <Link to={el.url} key={el.id}>
                    <div className="flex xl:h-full object-cover overflow-hidden">
                      <img src={el.img} alt="offers" className="w-full" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-3 flex justify-center tems-center overflow-hidden">
        <a href="https://www.myntra.com/shop/download-the-app">
          <img src={footerimg} alt="footerimg" className="max-w-[100%]" />
        </a>
      </div>
    </>
  );
};

export default HomePage;
