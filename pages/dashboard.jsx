import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import { getSession } from "next-auth/react";
export default function Component({ initData }) {
  const { data: session } = useSession();
  const [data, setData] = useState(initData);
  const router = useRouter();
  console.log(data);
  // useEffect(() => {
  //   setData(initData);
  // }, [initData]);
  function submit(e) {
    e.preventDefault();

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  if (session) {
    return (
      <>
        {/* <Header /> */}
        <div className="md:min-h-screen pb-2   mt-14 bg-slate-700">
          <div className="w-full  p-6 py-8 bg-slate-900">
            <h3 className="text-white text-xl md:text-2xl py-3 text-center font-thin">
              Paste a long URL followed by a custom phrase (optional) and click
              shorten
            </h3>
            <form
              onSubmit={submit}
              className="w-full flex flex-col md:flex-row justify-center"
            >
              <input
                type="text"
                placeholder="Paste here"
                id="url"
                className="p-3 bg-white rounded w-full md:w-4/5 md:rounded-l md:rounded-none md:border-r-4 md:border-solid md:border-blue-700"
              />
              <input
                type="text"
                id="shortUrl"
                placeholder="Paste custom phrase (optional)"
                className="p-3 bg-white my-3 md:my-0 rounded w-full md:w-2/5  md:rounded-none"
              />

              <button className="bg-primary p-3 rounded  md:rounded-none md:rounded-r text-white w-full md:w-1/5 self-end md:self-center  ">
                Shorten
              </button>
            </form>
          </div>
          <div className=" flex flex-col-reverse p-6 justify-center items-center md:justify-center  md:flex-row-reverse md:flex-wrap-reverse min-h-screen">
            {data?.map((item, index) => (
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
                  onClick={() => navigator.clipboard.writeText(item.shortUrl)}
                  className="flex self-end font-thin bg-white p-2 text-stone-800 rounded m-1"
                >
                  Copy Link
                  <FaRegCopy className="m-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
}
export async function getServerSideProps(context) {
  // Fetch data from external API
  const session = await getSession(context);
  let data;
  if (session) {
    const url =
      (process.env.NODE_ENV == "production" &&
        `https://axer.vercel.app/api/user/${session.user.email}`) ||
      `http://${context.req.headers.host}/api/user/${session.user.email}`;
    const res = await fetch(url);
    const initData = await res.json();
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
