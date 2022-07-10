import React, { useState } from "react";

export default function () {
  const [isNavOpen, setNavOpen] = useState(false);
  const list = ["Home", "About", "Create Account"];
  return (
    <>
      <div className="flex z-10 w-screen items-center justify-end bg-green-400 h-14 sticky top-0 drop-shadow-xl">
        <ul className="md:flex md:scale-100  scale-0">
          {" "}
          {list.map((item, index) => (
            <li
              className="p-2 text-gray-50 m-1 font-bold hover:text-gray-600"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          className="md:hidden relative  p-1 bg-purple-700 after:rounded-full after:w-5 after:h-5 after:bg-slate-500 after:absolute after:top-[-9px] after:right-[-9px] after:animate-pulse  mr-3"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          menu
        </button>
      </div>
      <div
        className={`md:hidden absolute w-screen z-0 bg-secondary ${
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
