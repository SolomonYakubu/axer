import React, { useRef } from "react";
import Header from "../components/Header";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Head from "next/head";
import { userAgent } from "next/server";
export default function signup() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const passwordAlert = useRef(null);
  const confirmAlert = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (!e.target.password.value.match("(.{6,})")) {
      return (passwordAlert.current.innerText =
        "Password must be a minimum of 6 characters");
    }
    passwordAlert.current.innerText = "";

    if (e.target.password.value !== e.target.confirmPassword.value) {
      return (confirmAlert.current.innerText =
        "Value must match entered password");
    }
    confirmAlert.current.innerText = "";
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <Head>
        <title>Axer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="rgb(107, 36, 168)" />
      </Head>
      <Header />
      <div className="md:mt-14 mt-6 flex items-center justify-center min-h-screen w-screen p-6 bg-slate-900">
        <div className="shadow-lg py-8 p-6 md:w-2/5 w-full bg-white rounded-md">
          <h3 className="text-center font-bold text-xl text-slate-500">
            Sign Up
          </h3>
          <form onSubmit={submit}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className='text-light after:content-["*"] after:text-red-900 after:font-bold after:ml-[2px]'
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                id="name"
                name="name"
                className="w-full p-2 rounded border-slate-200 border border-solid"
                required
                minLength={3}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className='text-light after:content-["*"] after:text-red-900 after:font-bold after:ml-[2px]'
              >
                Email
              </label>
              <input
                type="Email"
                placeholder="example@gmail.com"
                className="w-full p-2 rounded border-slate-200 border border-solid"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className='text-light after:content-["*"] after:text-red-900 after:font-bold after:ml-[2px]'
              >
                Password
              </label>
              <input
                type="Password"
                placeholder="Your Password"
                id="password"
                name="password"
                className="w-full p-2 rounded border-slate-200 border border-solid"
                required
                // minLength={6}
              />
              <div
                className=" bg-red-200 text-red-600 font-light text-sm mt-1 p-1"
                ref={passwordAlert}
              ></div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className='text-light after:content-["*"] after:text-red-900 after:font-bold after:ml-[2px]'
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 rounded border-slate-200 border border-solid"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
              <div
                className=" bg-red-200 text-red-600 font-light text-sm mt-1 p-1"
                ref={confirmAlert}
              ></div>
            </div>
            <input
              type="submit"
              className="bg-primary w-full p-2 text-white font-bold mt-3 rounded"
              value={"Sign Up"}
            />
          </form>
          <p className="w-full my-2 text-slate-800 text-center flex items-center justify-between before:h-[1px] before:bg-black before:w-3/6 before:mr-1 after:h-[1px] after:bg-black after:w-3/6 after:ml-1">
            or
          </p>
          <button className=" bg-red-700 flex w-full items-center justify-center p-2 text-white font-bold rounded">
            <BsGoogle />
            <span className="ml-2">Continue with Google</span>
          </button>

          <button className=" bg-blue-700 mt-2 flex w-full items-center justify-center p-2 text-white font-bold rounded">
            <FaFacebookF />
            <span className="ml-2">Continue with Facebook</span>
          </button>
        </div>
      </div>
    </>
  );
}
