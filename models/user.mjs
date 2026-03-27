import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "le courriel est requis"],
    },
    password: {
      type: String,
      required: [true, "le mot de passe est requis"],
      select: false,
    },
  },
  { timestamps: true },
);

export default model("User", userSchema);
