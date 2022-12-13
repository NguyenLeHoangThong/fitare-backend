import { Router } from "express";
import { exampleRouter } from "./example/example.route.js";

export const traineeRouter = Router();

traineeRouter.use('/example', exampleRouter);