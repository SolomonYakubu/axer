import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: String,
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
const User = models.User || model("User", userSchema);

export default User;
