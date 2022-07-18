import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { GiWoodAxe } from "react-icons/gi";
import { Link, animateScroll as scroll } from "react-scroll";
export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const [home, setHome] = useState(true);
  const list = [
    ["Home", "/", true],
    ["About", "/about", false],

    ["FAQs", "/faqs", false],
  ];

  const sessionList = [
    ["Dashboard", "/dashboard", true],
    ["Profile", "/profile", true],
  ];
  const router = useRouter();
  useEffect(() => {
    setNavOpen(false);
    if (router.pathname === "/") {
      return setHome(true);
    }
    setHome(false);
  }, [router]);
  return (
    <div className="fixed top-0 z-20">
      <div className=" p-4 md:px-16 md:py-8 flex w-screen items-center justify-between bg-primary h-[8vh]  drop-shadow-b-md">
        <GiWoodAxe className="ml-3 text-white" size={50} />

        {(session && (
          <ul className=" md:justify-between  md:flex hidden">
            {" "}
            {sessionList.map(([name, link], index) => (
              <li
                className="m-2 text-gray-50 font-light  cursor-pointer hover:text-blue-400"
                key={index}
                onClick={() => router.push(link)}
              >
                {name}
              </li>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className=" bg-white mx-2 text-slated-900 p-2 font-light transition:scale duration-200  rounded-sm border-none hover:scale-105"
            >
              Logout
            </button>
          </ul>
        )) || (
          <ul className="  md:justify-between  md:flex hidden">
            {" "}
            {list.map(
              ([name, link], index) =>
                (home && (
                  <Link
                    className="m-2 text-gray-50  cursor-pointer hover:text-blue-400"
                    key={index}
                    activeClass="active"
                    to={name}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    {name}
                  </Link>
                )) || (
                  <li
                    className="m-2 text-gray-50  cursor-pointer hover:text-blue-400"
                    onClick={() => router.push("/")}
                    key={index}
                  >
                    {name}
                  </li>
                )
            )}
            <button
              onClick={() => router.push("/login")}
              className=" bg-white mx-2 text-slated-900 p-2 font-light transition:scale duration-200  rounded-sm border-none hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className=" bg-white mx-2 text-slated-900 p-1 font-light transition:scale duration-200 rounded-sm border-none hover:scale-105"
            >
              Create free account
            </button>
          </ul>
        )}
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
        {(session && (
          <ul className=" flex flex-col">
            {" "}
            {sessionList.map(([name, link], index) => (
              <li
                className="m-2 text-gray-50 font-light text-xl  cursor-pointer hover:text-blue-400"
                key={index}
                onClick={() => router.push(link)}
              >
                {name}
              </li>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className=" bg-white mx-2 text-slated-900 p-2 font-light transition:scale duration-200  rounded-sm border-none hover:scale-105"
            >
              Logout
            </button>
          </ul>
        )) || (
          <ul className="flex flex-col">
            {list.map(
              ([name, link], index) =>
                (home && (
                  <Link
                    className={`mt-2 pl-2 text-gray-50 m-1 font-light text-xl hover:scale-105`}
                    key={index}
                    onClick={() => setNavOpen(false)}
                    activeClass="mobile-active"
                    to={name}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    {name}
                  </Link>
                )) || (
                  <li
                    className={`mt-2 pl-2 text-gray-50 m-1 font-light text-xl hover:scale-105`}
                    key={index}
                    onClick={() => router.push("/")}
                  >
                    {name}
                  </li>
                )
            )}
            <button
              onClick={() => router.push("/login")}
              className=" bg-white m-1 text-gray-900 p-2 font-light  rounded-sm mr-1 border-none w-32"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className=" bg-white m-1 text-gray-900 p-2 font-light rounded-sm mr-1 border-none px-4"
            >
              Create free account
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}
