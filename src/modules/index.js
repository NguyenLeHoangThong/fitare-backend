import { Router } from "express";
import { mainRouter } from "./main/index.js";

export const router = Router();

router.use('/', mainRouter);
//router.use('/admin', adminRouter);

