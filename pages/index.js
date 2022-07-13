import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header.jsx";
import lincut from "../img/lincut.svg";
import { ImStatsDots } from "react-icons/im";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsController } from "react-icons/bs";
export default function Home() {
  const unique = [
    {
      heading: "Boost results",
      icon: (
        <VscWorkspaceTrusted
          size={70}
          strokeWidth={0}
          className=" text-blue-700"
        />
      ),
      body: "On top of better deliverability and click-through, rich link-level data gives you crucial insight into your link engagement so your team can make smarter decisions around its content and communications.",
    },
    {
      heading: "Inspire trust",
      icon: (
        <ImStatsDots
          size={70}
          // strokeWidth={0}
          className=" text-orange-500 "
        />
      ),
      body: "With more clicks comes increased brand recognition and consumer trust in your communications—which in turn inspires even more engagement with your links. (It’s a wonderful cycle.)",
    },
    {
      heading: "Gain control",
      icon: (
        <BsController size={70} className=" text-green-500" strokeWidth={0} />
      ),
      body: "Take credit for your content and learn more about how it’s consumed by enabling auto-branding—a feature that ensures your brand remains in any link someone shortens pointing to your website.",
    },
  ];
  return (
    <div className="z-10 absolute m-0 p-0 w-screen">
      <Header />
      <section className=" p-6 w-full bg-slate-900 mt-14 h-[90vh]">
        <div className="md:flex container p-3">
          <div className=" md:w-6/12 md:mt-14">
            <h3 className="font-extrabold text-4xl md:text-7xl text-blue-400">
              Lincut
            </h3>
            <h3 className="font-extrabold text-4xl md:text-5xl text-white mb-4">
              Make it Short, Own Your Link
            </h3>
            <p className="text-white font-thin text-xl mb-4">
              A link shortener that gives you the power to grow and monitor your
              brand
            </p>
            <div className="flex mb-10 md:mb-0 w-5/6">
              <button className=" bg-green-400 text-white p-3 font-bold rounded-sm mr-1 border-none w-full">
                Get started for free
              </button>
              {/* <button className=" bg-green-400 text-white p-3 font-bold rounded-sm border-none w-6/12">
                Sign Up
              </button> */}
            </div>
          </div>

          <Image className=" md:w-2/5 z-0" src={lincut} alt="illustration" />
        </div>
      </section>
      <section className="p-6  w-full bg-white">
        <h3 className=" text-center text-2xl text-gray-600 font-extrabold">
          The link shortener that has your brand’s back
        </h3>
        <p className="text-center mb-10 font-light">
          Your brand wasn’t built to be hidden. Help it stand out with branded
          links that drive more clicks.
        </p>
        <div className=" md:flex w-full">
          {unique.map((item, index) => (
            <div
              className="hover:bg-blue-300 hover:text-white hover:scale-105 hover:transition-transform hover:ease-in duration-200 hover:duration-200 scale-100 transition-transform ease-out text-gray-600  bg-white m-3 mb-5 p-8 rounded-md shadow-xl relative after:absolute after:rounded-tr-md after:top-0 after:right-0 after:bg-slate-600 after:w-10 after:h-10  before:absolute before:top-0 before:left-0 before:rounded-tl-md before:bg-blue-600 before:w-10 before:h-10"
              key={index}
            >
              <div className="mb-3 flex justify-center">{item.icon}</div>
              <h4 className=" text-center text-2xl  font-extrabold">
                {item.heading}
              </h4>
              <p className="text-center font-light ">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
