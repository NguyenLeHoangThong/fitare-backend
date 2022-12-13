import { Router } from "express";
//import { adminRouter } from "./admin";
//import { trainerRouter } from "./trainer";
//import { qualityController } from "./qualityController";
import { traineeRouter } from "./trainee/index.js";

export const router = Router();

router.use('/trainee', traineeRouter);
//router.use('/admin', adminRouter);

