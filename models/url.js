import { Schema, model, models } from "mongoose";

const urlSchema = Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Url = models.Url || model("Url", urlSchema);

export default Url;
