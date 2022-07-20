import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";
import Layout from "../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import connectMongo from "../utils/connectMongo";
import empty from "../public/empty.svg";
import Url from "../models/url";
import Image from "next/image";

export default function Component({ initData }) {
  const { data: session } = useSession();
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!e.target.url.value) {
      return toast.error("Paste a link", { duration: 1500 });
    }
    setLoading(true);
    fetch("/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: session?.user?.email,
        fullUrl: e.target.url.value,
        customPhrase: e.target.shortUrl.value,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setData([...data, resData]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  if (session) {
    return (
      <Layout>
        <div className=" bg-slate-700 ">
          <div className="w-full  p-6 py-8 bg-slate-900">
            <h3 className="text-white text-xl md:text-2xl py-3 text-center font-thin">
              Paste a long URL followed by a custom phrase (optional) and click
              shorten
            </h3>
            <form
              onSubmit={submit}
              className={`w-full flex flex-col md:flex-row justify-center ${
                loading && "pointer-events-none"
              }`}
            >
              <input
                type="text"
                placeholder="Paste here"
                id="url"
                className="p-3 bg-white rounded outline-none w-full md:w-4/5 md:rounded-l md:rounded-none md:border-r-4 md:border-solid md:border-blue-700"
              />
              <input
                type="text"
                id="shortUrl"
                placeholder="Paste custom phrase (optional)"
                className="p-3 bg-white outline-none my-3 md:my-0 rounded w-full md:w-2/5  md:rounded-none"
              />

              <button
                disabled={loading}
                className={`bg-primary md:w-1/4 flex w-full  relative items-center justify-center p-3 text-white font-light my-3 md:my-0 md:rounded-none md:rounded-r outline-none rounded disabled:opacity-50`}
              >
                {loading && (
                  <AiOutlineLoading
                    size={30}
                    className="animate-spin mr-2 absolute left-10  "
                  />
                )}{" "}
                Shorten
              </button>
            </form>
          </div>
          {(data[0] && (
            <div className=" flex flex-col p-6 justify-start   items-center md:justify-center  md:flex-row md:flex-wrap">
              {data
                ?.slice(0)
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="p-4  flex flex-col justify-center items-center  shadow-lg rounded m-3 h-72 w-full md:w-1/4 break-all bg-slate-800 "
                  >
                    <FiLink size={40} className="text-center text-white" />
                    <div className=" text-white text-md self-start">
                      Full Link:{" "}
                      <a
                        className="text-sm font-light text-blue-400"
                        href={`//${item.fullUrl}`}
                      >
                        {item.fullUrl}
                      </a>
                    </div>
                    <div className=" text-white text-md self-start">
                      Shortened Link:{" "}
                      <a
                        className="text-sm font-light text-blue-400"
                        href={`//${item.shortUrl}`}
                      >
                        {item.shortUrl}
                      </a>
                    </div>
                    <div className="font-bold self-end flex items-center text-lg text-white">
                      Clicks:{" "}
                      <span className="text-3xl ml-1 text text-white">
                        {item.clicks}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(item.shortUrl)
                      }
                      className="flex self-end font-thin bg-white p-2 text-stone-800 rounded m-1"
                    >
                      Copy Link
                      <FaRegCopy className="m-1" />
                    </button>
                  </div>
                ))}
            </div>
          )) || (
            <div className=" flex flex-col justify-center items-center">
              <h3 className="text-xl m-2 text-white font-thin text-center">
                {"You don't seem to have any links yet"}{" "}
              </h3>
              <Image src={empty} alt="empty" className="w-full h-full" />
            </div>
          )}
          <Toaster />
        </div>
      </Layout>
    );
  }
}
export async function getServerSideProps(context) {
  // Fetch data from external API
  const session = await getSession(context);

  if (session) {
    await connectMongo();
    const user = session.user.email;
    await connectMongo();

    const host = context.req.headers.host;

    const url = await Url.find({ user });
    const initData = url.map((item) => ({
      fullUrl: item.fullUrl,
      shortUrl: `${host}/${item.shortUrl}`,
      clicks: item.clicks,
    }));
    // const initData = JSON.parse(JSON.stringify(await Url.find({ user })));

    return { props: { initData } };
  }
  // Pass data to the page via props
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
