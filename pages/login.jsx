import React from "react";
import Header from "../components/Header";
import { signIn, signOut } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(status);
    if (status.ok) {
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
      <Head>
        <title>Lincut</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="rgb(107, 36, 168)" />
      </Head>
      <Header />
      <div className="md:mt-14 mt-6 flex items-center justify-center  min-h-screen w-screen p-6 bg-slate-900">
        <div className="shadow-lg py-8 p-6 md:w-2/5 w-full bg-white rounded-md">
          <form onSubmit={onSubmit}>
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

            <button className="bg-primary w-full p-2 text-white font-bold mt-3 rounded">
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
