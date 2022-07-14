// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      res.status(200).json({ message: req.body });
      break;
    case "GET":
  }
}
