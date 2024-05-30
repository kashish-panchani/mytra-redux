import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import picture from "../Images/login/pic.webp";
import USERIMAGE from "../Images/login/profile.jpg";
import useToast from "../hook/useToast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { success, error } = useToast();

  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      error("Please fill in all the details.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isExistingUser = users.find((user) => user.email === email);

    if (isExistingUser){
      if (isExistingUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(isExistingUser));
        success("Successfully logged in!");
        navigate("/");
      } else {
        error("Invalid crediantial.");
      }
    } else {
      error("User not found.");
    }
  };

  const handleLogout = () => {                      
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("wishlist");
    setIsLoggedIn(false);
    success("Successfully logged out!");
    navigate("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-hidden">
      <>
        {isLoggedIn ? (
          <section className="bg-red-50   dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto h-full  sm:py-0 sm:h-screen lg:py-0">
              <div className="w-[210px] bg-white shadow dark:border md:mt-0 sm:h-72 sm:w-[350px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
                  <div className="flex justify-center items-center">
                    <img
                      src={USERIMAGE}
                      alt="useImage"
                      className="sm:w-28 w-16"
                    />
                  </div>
                  <h1 className="text-sm font-bold leading-tight  text-gray-900 sm:text-lg ">
                    {`Hey! ${loggedInUser.name}`}
                  </h1>

                  <button
                    onClick={handleLogout}
                    className="w-full border text-white bg-rose-500 focus:outline-none font-medium rounded-lg text-[11px] sm:text-sm px-5 py-2.5 text-center"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-red-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-28 mx-auto">
              <div className=" bg-white  shadow dark:border md:mt-0 w-80 sm:w-96 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <img src={picture} className="object-contain" />
                <div className="p-3 space-y-4 md:space-y-6  sm:p-8">
                  <h1 className="sm:text-xl text-base font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    onSubmit={handleLogin}
                    className="space-y-4 md:space-y-6"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2  text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full border  text-white bg-rose-500  focus:outline-none font-medium rounded-lg text-sm sm:text-md px-5 py-2.5 text-center "
                    >
                      Sign in
                    </button>

                    <div className="flex justify-center items-center">
                      <label className="text-sm">
                        Don't have an account?{" "}
                        <Link to="/register">
                          <span className="text-sm text-blue-500">
                            Sign up{" "}
                          </span>
                        </Link>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    </div>
  );
};

export default Login;
