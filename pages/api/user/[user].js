// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
import Url from "../../../models/url";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        await connectMongo();
        const { user } = req.query;
        const host = req.headers.host;
        console.log(user);
        const url = await Url.find({ user });
        console.log(url);
        return res.status(200).json(
          url.map((item) => ({
            fullUrl: item.fullUrl,
            shortUrl: `${host}/${item.shortUrl}`,
            clicks: item.clicks,
          }))
        );
      } catch (err) {
        console(err.message);
      }
  }
}
