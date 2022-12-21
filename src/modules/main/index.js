import { Router } from "express";
import { exercisePlansRouter } from "./exerciseplans/exerciseplans.route.js";
import { UsersRouter } from "./users/users.route.js";

export const mainRouter = Router();

mainRouter.use('/exerciseplans', exercisePlansRouter);
mainRouter.use('/users', UsersRouter);