// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "../../utils/connectMongo";
import Url from "../../models/url";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import crypto from "crypto";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(session);
  if (session) {
    switch (req.method) {
      case "POST":
        const { fullUrl, customPhrase, user } = req.body;
        if (
          !fullUrl.match(
            new RegExp(
              /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
            )
          )
        ) {
          return res.status(400).json("error");
        }
        const formatedPhrase =
          (customPhrase && customPhrase.split(" ").join("-")) ||
          crypto.randomBytes(5).toString("hex");
        try {
          await connectMongo();
          let host = req.headers.host;
          const url = await new Url({
            fullUrl,
            shortUrl: `${formatedPhrase}`,
            user,
          }).save();
          res.status(201).json({
            fullUrl,
            shortUrl: `${host}/${formatedPhrase}`,
            clicks: 0,
          });
        } catch (error) {
          res.json(error.message);
        }

        break;
      case "GET":
    }
  }
  return res.status(401).json();
}
