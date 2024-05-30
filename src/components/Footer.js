import React from "react";
import { Link } from "react-router-dom";
import { footerLink } from "../Constants/footer";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="container mx-auto pt-2 sm:py-8 px-4 ">
        <div className="flex justify-start gap-4">
          {footerLink.map((el) => (
            <div
              className="w-[28%] text-[8px] sm:text-sm lg:text-left mb-4 lg:mb-0"
              key={el.id}
            >
              <h4 className="text-[7px] sm:text-xs font-bold mb-4">
                {el.title}
              </h4>
              <ul>
                {el.links.map((e,index) => (
                  <a href={e.link} key={index}>
                    <li>{e.label}</li>
                  </a>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-10">
          <h1 className="font-bold text-[8px]  sm:text-xs">MYNTRA APP</h1>
          <p className="sm:text-sm text-[8px]">
            Myntra, India’s no. 1 online fashion destination justifies its
            fashion relevance by bringing something new and chic to the table on
            the daily. Fashion trends seem to change at lightning speed, yet the
            Myntra shopping app has managed to keep up without any hiccups. In
            addition, Myntra has vowed to serve customers to the best of its
            ability by introducing its first-ever loyalty program, The Myntra
            Insider. Gain access to priority delivery, early sales, lucrative
            deals and other special perks on all your shopping with the Myntra
            app. Download the Myntra app on your Android or IOS device today and
            experience shopping like never before!
          </p>
        </div>{" "}
        <div className="my-10">
          <h1 className="font-bold text-[8px] sm:text-xs ">
            ONLINE SHOPPING MADE EASY AT MYNTRA
          </h1>
          <p className="sm:text-sm text-[8px]">
            If you would like to experience the best of online shopping for men,
            women and kids in India, you are at the right place. Myntra is the
            ultimate destination for fashion and lifestyle, being host to a wide
            array of merchandise including clothing, footwear, accessories,
            jewellery, personal care products and more. It is time to redefine
            your style statement with our treasure-trove of trendy items. Our
            online store brings you the latest in designer products straight out
            of fashion houses. You can shop online at Myntra from the comfort of
            your home and get your favourites delivered right to your doorstep.
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="w-full lg:w-1/2 lg:text-left text-center">
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="../myntralogo.png"
                  alt="Amazon Logo"
                  className="h-10 sm:h-16  mr-2  object-contain "
                />
              </Link>
            </div>
            <div className="text-center">
              <span className="sm:text-sm text-[8px] font-bold">
                © 1996-2023, Myntra.com, Inc. or its affiliates
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
