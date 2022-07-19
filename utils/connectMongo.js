import mongoose from "mongoose";

const connectMongo = async () => {
  let connected = false;
  const db = mongoose.connection;

  if (db.readyState === 1) {
    return;
  }

  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to DB"));

  db.on("error", () => console.error("DB connection failed"));
};

// const connectMongo = async () => await mongoose.connect(process.env.MONGO_URI);

export default connectMongo;
