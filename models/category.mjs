import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "le nom est requis"],
    },
  },
  { timestamps: true },
);

export default model("Category", categorySchema);
