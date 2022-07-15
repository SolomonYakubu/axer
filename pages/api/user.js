// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "../../utils/connectMongo";
import User from "../../models/user";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        await connectMongo();
        console.log("Connected");
        const { name, email, password } = req.body;
        if (await User.findOne({ email })) {
          return res.status(400).json("User exist");
        }
        new User(req.body).save();
        return res.status(201).json("Registered");
      } catch (error) {
        res.json(error.message);
      }

      break;
    case "GET":
  }
}
