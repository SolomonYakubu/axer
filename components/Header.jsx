import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { GiWoodAxe } from "react-icons/gi";

export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  const list = [
    ["Home", "/", true],
    ["About", "/about", false],
  ];

  const router = useRouter();
  return (
    <div className="fixed top-0 z-20">
      <div className=" p-4 md:px-16 md:py-8 flex w-screen items-center justify-between bg-primary h-14  drop-shadow-b-md">
        <GiWoodAxe className="ml-3 text-white" size={50} />
        <ul className="md:flex md:scale-100  scale-0">
          {" "}
          {list.map(([name, link], index) => (
            <li
              className="m-2 text-gray-50 font-bold hover:scale-105 cursor-pointer"
              key={index}
              onClick={() => router.push(link)}
            >
              {name}
            </li>
          ))}
          <button
            onClick={() => router.push("/login")}
            className=" bg-white mx-2 text-slated-900 p-2 font-bold rounded-sm border-none hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className=" bg-white mx-2 text-slated-900 p-2 font-bold rounded-sm border-none hover:scale-105"
          >
            Create free account
          </button>
        </ul>

        <button
          className="md:hidden relative  p-2 outline-none after:rounded-full mr-3 text-white "
          onClick={() => setNavOpen(!isNavOpen)}
        >
          {(isNavOpen && <AiOutlineClose size={30} />) || (
            <RiMenu4Line size={30} />
          )}
        </button>
      </div>
      <div
        className={`md:hidden overflow-hidden w-screen py-5 p-2 flex flex-col bg-gray-800  items-start justify-center transition-max-height ease-out duration-500 ${
          (isNavOpen && " max-h-96") || "max-h-0 py-0 p-0"
        }`}
      >
        <ul>
          {list.map(([name, link, active], index) => (
            <li
              className={`pt-2 text-gray-50 m-1 font-bold hover:scale-105 ${
                active && "border-solid border-b-4"
              }`}
              key={index}
              onClick={() => router.push(link)}
            >
              {name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => router.push("/login")}
          className=" bg-primary m-1 text-white p-2 font-bold rounded-sm mr-1 border-none w-32"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className=" bg-primary m-1 text-white p-2 font-bold rounded-sm mr-1 border-none w-3/6"
        >
          Create free account
        </button>
      </div>
    </div>
  );
}
