import { Router } from "express";
import { getDataController,getBaseController,getIntensityController } from "../controllers/dataset.controller.js";
const router = Router();
router.route("/data").get(getDataController)
router.route("/").get(getBaseController)
router.route("/intensity").get(getIntensityController)
export {router}