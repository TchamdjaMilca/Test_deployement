import express from "express";
import * as categoryController from "../controller/categoryController.mjs";
import isAuth from "../middlewares/isAuth.mjs";

const router = express.Router();

router.post("/categories", isAuth, categoryController.createCategory);

export default router;
