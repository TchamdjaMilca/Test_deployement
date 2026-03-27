import express from "express";

import * as dbController from "../controller/dbController.mjs";

const router = express.Router();

router.post("/seed", dbController.seed);

export default router;
