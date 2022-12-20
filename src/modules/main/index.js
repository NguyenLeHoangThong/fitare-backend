import { Router } from "express";
import { exercisePlanRouter } from "./exerciseplan/exerciseplan.route.js";

export const mainRouter = Router();

mainRouter.use('/exerciseplan', exercisePlanRouter);