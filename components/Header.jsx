import React, { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  const list = ["Home", "About"];
  return (
    <div className="fixed top-0 z-20">
      <div className=" p-4 md:px-16 md:py-8 flex w-screen items-center relative z-40 justify-end bg-green-400 h-14  drop-shadow-xl">
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
          <li className=" bg-green-400 m-2 text-white font-bold rounded-sm border-none">
            Login
          </li>
          <li className=" bg-green-400 m-2 text-white font-bold rounded-sm border-none">
            Create free account
          </li>
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
        className={`md:hidden z-20 w-screen flex flex-col bg-gray-800 h-64 items-start justify-center ${
          (isNavOpen &&
            " transition-transform transform translate-y-50 ease-out duration-700") ||
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
        <button className=" bg-green-400 m-1 text-white p-2 font-bold rounded-sm mr-1 border-none w-32">
          Login
        </button>
        <button className=" bg-green-400 m-1 text-white p-2 font-bold rounded-sm mr-1 border-none w-3/6">
          Create free account
        </button>
      </div>
    </div>
  );
}
