import React, { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
export default function () {
  const [isNavOpen, setNavOpen] = useState(false);
  const list = ["Home", "About", "Create Account"];
  return (
    <>
      <div className="p-4 flex z-10 w-screen items-center justify-end bg-green-400 h-14 sticky top-0 drop-shadow-xl">
        <ul className="md:flex md:scale-100  scale-0">
          {" "}
          {list.map((item, index) => (
            <li
              className="m-2 text-gray-50 font-bold hover:text-gray-600"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          className="md:hidden relative  p-2 outline-none after:rounded-full mr-3 text-white"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          {(isNavOpen && <AiOutlineClose size={30} />) || (
            <RiMenu4Line size={30} />
          )}
        </button>
      </div>
      <div
        className={`md:hidden absolute w-screen z-0 bg-secondary h-screen ${
          (isNavOpen &&
            "flex transition-transform transform translate-y-50 ease-out duration-700") ||
          "transition-transform transform duration-500 translate-y-[-150%]"
        }`}
      >
        <ul>
          {list.map((item, index) => (
            <li
              className="p-2 text-gray-50 m-1 font-bold hover:text-gray-600"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
