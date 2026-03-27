import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    titre: {
      type: String,
      required: [true, "le titre est requis"],
    },

    contenu: {
      type: String,
      required: [true, "le contenu est requis"],
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: "Category", //nom du fichier
    },
  },
  { timestamps: true },
);

export default model("Article", articleSchema);
