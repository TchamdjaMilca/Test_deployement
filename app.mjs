import express from "express";
import mongoose from "mongoose";
import articleRoutes from "./routes/articles.mjs";
import authRoutes from "./routes/auth.mjs";
import categoryRoutes from "./routes/categories.mjs";
import { get404, getErrors } from "./controller/errorController.mjs";
import seed from "./routes/db.mjs";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT ||3000;
//Middleware global pour lire du JSON
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', 'https://cdpn.io');

  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
//Pour créer un middleware

//Middleware 1
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  next();
});

//Prochain middleware
app.get("/", (req, res) => {
  const response = {
    message: "Bienvenue sur mon API",
  };
  res.status(200);
  //  res.status(200).json(response); ou
  res.end(JSON.stringify(response));
});

app.use("/articles", articleRoutes);

app.use("/categories", categoryRoutes);

app.use("/auth", authRoutes);

app.use("/db", seed);
app.use("/", get404);
app.use(getErrors);

mongoose
    .connect(process.env.DATA_BASE)
    .then(() => {
        app.listen(3000, () => {
            console.log("Node.js est à l'écoute sur http://localhost:%s ", process.env.PORT);
        });
    })
    .catch(err => console.log(err));
    
export default app;//Permet d'exporter l'application pour être utilisée par Vercel

/**
 * cd .. pour quitter un dossier
 */
