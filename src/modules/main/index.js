import { Router } from "express";
import { exercisePlansRouter } from "./exerciseplans/exerciseplans.route.js";

export const mainRouter = Router();

mainRouter.use('/exerciseplans', exercisePlansRouter);