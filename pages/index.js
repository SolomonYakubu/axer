import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import Header from "../components/Header.jsx";
import lincut from "../public/axer.svg";
import { AiOutlineRise } from "react-icons/ai";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsController } from "react-icons/bs";
import Accordion from "../components/Accordion";
export default function Home() {
  const router = useRouter();
  const list = [
    ["Home", "/"],
    ["About", "/"],

    ["Login", "/login"],
    ["Sign Up", "/signup"],
  ];
  const faqs = [
    {
      title: "What is a URL Shortener?",
      description: `A URL shortener, also known as a link shortener, seems like a simple tool, but it is a service that can have a dramatic impact on your marketing efforts.

Link shorteners work by transforming any long URL into a shorter, more readable link. When a user clicks the shortened version, they’re automatically forwarded to the destination URL.`,
    },
    {
      title: "Benefits of a Short URL",
      description: `How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.

On a more practical side, a short URL is also easier to incorporate into your collateral`,
    },
    {
      title: "What is a Custom URL Shortener?",
      description: `A custom URL shortener, sometimes referred to as a branded URL shortener, lets you brand your links. There are several benefits of branding your short links. Branded links build trust between your audience and your business, drive more clicks, give your audience a preview of where they are being taken and increase brand awareness.`,
    },
    {
      title: "Why Choose Lincut",
      description: `Whether you’re sharing one link or millions, our platform was built to help you make every point of connection between your content and your audience ignite action.

That’s why the most recognized brands in the world love our platform.`,
    },
  ];

  const unique = [
    {
      heading: "Boost results",

      icon: (
        <AiOutlineRise
          size={70}
          // strokeWidth={0}
          className=" text-orange-400 "
        />
      ),
      body: "On top of better deliverability and click-through, rich link-level data gives you crucial insight into your link engagement so your team can make smarter decisions around its content and communications.",
    },
    {
      heading: "Inspire trust",
      icon: (
        <VscWorkspaceTrusted
          size={70}
          strokeWidth={0}
          className=" text-blue-400"
        />
      ),
      body: "With more clicks comes increased brand recognition and consumer trust in your communications—which in turn inspires even more engagement with your links. (It’s a wonderful cycle.)",
    },
    {
      heading: "Gain control",
      icon: (
        <BsController size={70} className=" text-purple-400" strokeWidth={0} />
      ),
      body: "Take credit for your content and learn more about how it’s consumed by enabling auto-branding—a feature that ensures your brand remains in any link someone shortens pointing to your website.",
    },
  ];
  const faqComponents = faqs.map((faq, index) => {
    return (
      <Accordion title={faq.title} key={index} description={faq.description} />
    );
  });

  return (
    <div className="overflow-hidden m-0 p-0 max-w-screen m-h-screen">
      {/* <Header /> */}
      <section
        className="px-6 py-14 md:mt-3 mb-0 w-full bg-slate-900  min-h-[93vh] "
        id="Home"
      >
        <div className="md:flex md:items-center md:justify-between md:w-full  p-3">
          <div className=" mt-10 md:w-6/12 ">
            <h3 className="font-extrabold text-4xl md:text-7xl text-blue-400 animate-pulse">
              Axer
            </h3>
            <h3 className="font-extrabold text-4xl md:text-5xl text-white mb-4">
              Make it Short, Own Your Link
            </h3>
            <p className="text-white font-thin text-xl mb-4">
              A link shortener that gives you the power to grow and monitor your
              brand
            </p>
            <div className="flex mb-10 md:mb-0 w-5/6">
              <button
                onClick={() => router.push("/signup")}
                className="hover:scale-105 bg-primary text-white p-3 font-bold rounded-sm mr-1 border-none w-full"
              >
                Get started for free
              </button>
              {/* <button className=" bg-primary text-white p-3 font-bold rounded-sm border-none w-6/12">
                Sign Up
              </button> */}
            </div>
          </div>

          <Image className=" md:w-6/12 z-0" src={lincut} alt="illustration" />
        </div>
      </section>
      <section className="p-6  w-full bg-white" id="About">
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
              className="hover:bg-slate-800 hover:text-white hover:scale-105 hover:transition-transform hover:ease-in duration-200 hover:duration-200 scale-100 transition-transform ease-out text-gray-600  bg-white m-3 mb-5 p-8 rounded-md shadow-xl   "
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

      <section
        className="w-full bg-slate-900 h-60 flex flex-col items-center justify-center"
        id="FAQs"
      >
        <h3 className=" text-center text-4xl text-white font-extrabold mb-7">
          More than a free link shortener
        </h3>

        <button
          onClick={() => router.push("/signup")}
          className=" bg-primary text-white p-3 font-bold rounded-sm mr-1 border-none"
          id="FAQs"
        >
          Start for free
        </button>
      </section>
      <section className="p-6 w-full mb-6">
        <h3
          className=" text-center text-3xl text-gray-700 font-extrabold mb-7"
          id="FAQs"
        >
          Frequently Asked Questions
        </h3>
        {faqComponents}
      </section>
      <section className="w-full p-6  bg-slate-900 flex flex-col items-center justify-center">
        <h3 className=" text-center text-2xl text-white font-extrabold mb-3">
          Quick Links
        </h3>
        {list.map(([item, link], index) => (
          <div
            onClick={() => router.push(link)}
            className="text-white font-thin text-lg"
            key={index}
          >
            {item}
          </div>
        ))}
        <div className="my-3 text-center">
          <p className="font-thin text-white text-sm">Privacy Policy</p>
          <p className="font-thin text-sm text-white">
            Copyright © 2021 Solomon. All Rights Reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
