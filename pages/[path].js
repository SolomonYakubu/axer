function Page({ data }) {
  // Render data...
}
import Url from "../models/url";
import connectMongo from "../utils/connectMongo";
// This gets called on every request
export async function getServerSideProps({ params, req, res }) {
  // Fetch data from external API
  await connectMongo();
  const url = await Url.findOne({ shortUrl: params.path });
  console.log(params, url);

  // Pass data to the page via props
  url.clicks++;
  await url.save();
  return {
    redirect: {
      destination: url.fullUrl,
      permanent: false,
    },
  };
}

export default Page;
