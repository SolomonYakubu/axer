import React, { useState } from "react";
import Header from "../components/Header";
import { signIn, signOut } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

import Head from "next/head";
import { useRouter } from "next/router";
export default function Login() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(status);
    if (status.ok) {
      setLoading(false);
      router.push("/dashboard");
    }
  };
  const handleGoogleSignin = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/dashboard" });
  };
  const handleFacebookSignin = (e) => {
    e.preventDefault();
    signIn("facebook", { callbackUrl: "/dashboard" });
  };
  return (
    <>
      {/* <Header /> */}
      <div className="mt-[8vh] min-h-[92vh]  flex items-center justify-center py-4  px-6 bg-slate-900">
        <div className="shadow-lg py-8 p-6 md:w-2/5 w-full bg-white rounded-md">
          <form onSubmit={onSubmit} disabled={loading}>
            <h3 className="text-center font-bold text-xl text-slate-500">
              Login
            </h3>

            <div className="mb-2">
              <label
                htmlFor="password"
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
                className="w-full p-2 rounded border-slate-200 border border-solid"
                id="password"
                name="password"
              />
            </div>

            <button
              disabled={loading}
              className={`bg-primary flex w-full relative items-center justify-center p-2 text-white font-bold mt-3 rounded disabled:opacity-50`}
            >
              {loading && (
                <AiOutlineLoading
                  size={30}
                  className="animate-spin mr-2 absolute left-10  "
                />
              )}{" "}
              Login
            </button>
          </form>
          <p className="w-full my-2 text-slate-800 text-center flex items-center justify-between before:h-[1px] before:bg-black before:w-3/6 before:mr-1 after:h-[1px] after:bg-black after:w-3/6 after:ml-1">
            or
          </p>
          <button
            onClick={handleGoogleSignin}
            className=" bg-red-700 flex w-full items-center justify-center p-2 text-white font-bold rounded"
          >
            <BsGoogle />
            <span className="ml-2">Continue with Google</span>
          </button>
          <button
            onClick={handleFacebookSignin}
            className=" bg-blue-700 mt-2 flex w-full items-center justify-center p-2 text-white font-bold rounded"
          >
            <FaFacebookF />
            <span className="ml-2">Continue with Facebook</span>
          </button>
        </div>
      </div>
    </>
  );
}
