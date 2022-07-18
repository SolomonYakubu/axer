import React from "react";
import Image from "next/image";
import notFound from "../public/404.svg";
import { useRouter } from "next/router";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="bg-slate-900 relative h-[92vh] flex items-center flex-col justify-start mt-[8vh] pt-8">
      <Image
        src={notFound}
        alt="not found"
        className="w-full h-full self-start"
      />

      <div className="absolute bottom-1/4 flex items-center justify-center flex-col">
        <h3 className="text-white text-4xl font-thin font-sans text-center">
          ....oooops seems you followed a wrong link
        </h3>
        <button
          className=" bg-white p-3 rounded font-thin text-lg m-1"
          onClick={() => router.back()}
        >
          Take me back
        </button>
      </div>
    </div>
  );
}
