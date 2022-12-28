import { Router } from "express";
import { exercisePlansRouter } from "./exerciseplans/exerciseplans.route.js";
import { UsersRouter } from "./users/users.route.js";
import { TrainerProfilesRouter } from "./trainerprofiles/trainerprofiles.route.js";
import { TraineeProfilesRouter } from "./traineeprofiles/traineeprofiles.route.js";
import { ReportRouter } from "./report/report.route.js";

export const mainRouter = Router();

mainRouter.use('/exerciseplans', exercisePlansRouter);
mainRouter.use('/users', UsersRouter);
mainRouter.use('/trainers', TrainerProfilesRouter);
mainRouter.use('/trainees', TraineeProfilesRouter);
mainRouter.use('/report', ReportRouter);