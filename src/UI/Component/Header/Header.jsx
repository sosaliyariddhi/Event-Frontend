import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./index.css";

export default function Header() {
  const navigate = useNavigate();

  let [{ token, user }, setCookie, removeCookie] = useCookies(["token"]);

  const logoutHandler = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/");
  };

  return (
    <>
      <div className="pl-5 pr-10 flex items-center justify-between w-100 pt-3 pb-3 font-sans sticky-top top-0 bg-gray-100 shadow-md">
        <div className="pe-5 h-full grid content-center">
          <h1>EventHHANDLER</h1>
        </div>
        <div className=" flex justify-center w-full relative"></div>
        {token ? (
          <div className="min-w-[70%] flex">
            <div className="flex items-center w-full justify-bet mr-10 ">
              {user?.userType === "admin" ? (
                <div className="list-none  flex justify-around w-1/2">
                  <NavLink to={"/event"}>EVENTS</NavLink>
                  <NavLink to={"/organizers"}>ORGANIZERS</NavLink>
                </div>
              ) : (
                <div className="list-none  flex justify-around w-1/2">
                  <NavLink to={"/event"}>EVENTS</NavLink>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="underline text-red-500 cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            className="transition-colors duration-500 p-2 px-7 rounded-md border-2 !border-gray-600	bg-white text-gray-600 hover:text-white hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
}
