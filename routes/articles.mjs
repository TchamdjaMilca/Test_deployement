import express from "express";
import * as articleController from "../controller/articleController.mjs";
import { validateArticle } from "../middlewares/validateArticle.mjs";
import isAuth from "../middlewares/isAuth.mjs";

const router = express.Router();

router.get("/", articleController.getArticles);

router.get("/:id", articleController.getArticlesById);

//Creation article
router.post("/", isAuth, validateArticle, articleController.createArticle);

//Suppression article
router.delete("/:id", isAuth, articleController.deleteArticle);

//Mise à jour
router.put("/:id", isAuth, validateArticle, articleController.updateArticle);

export default router;
