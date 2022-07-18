function Page({ data }) {}
import Url from "../models/url";
import connectMongo from "../utils/connectMongo";
// This gets called on every request
export async function getServerSideProps({ params, req, res }) {
  // Fetch data from external API
  await connectMongo();
  const url = await Url.findOne({ shortUrl: params.path });
  if (url) {
    // Pass data to the page via props
    url.clicks++;
    await url.save();
    const path = url.fullUrl.match("(http|https)")
      ? url.fullUrl
      : `http://${url.fullUrl}`;

    return {
      redirect: {
        destination: path,
        permanent: false,
      },
    };
  }
  return {
    redirect: { destination: "/404", permanent: false },
  };
}

export default Page;
