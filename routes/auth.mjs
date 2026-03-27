import express from "express";
import * as authController from "../controller/authController.mjs";

const router = express.Router();

router.post("/register", authController.createUser);
router.post("/login", authController.login);
export default router;
