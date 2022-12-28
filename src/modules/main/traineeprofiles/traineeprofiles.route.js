import { Router } from "express";
import TraineeProfilesController from "./traineeprofiles.controller.js"
import ExercisePlansController from "../exerciseplans/exerciseplans.controller.js"

export const TraineeProfilesRouter = Router();

TraineeProfilesRouter.route('/').post(TraineeProfilesController.createNewTrainee);
TraineeProfilesRouter.route('/:id').get(TraineeProfilesController.getAvailableTraineeProfiles);
TraineeProfilesRouter.route('/:id').put(TraineeProfilesController.updateTrainee);
TraineeProfilesRouter.route('/:userId/exerciseplans').get(ExercisePlansController.getUserFavoriteExercisePlans);
TraineeProfilesRouter.route('/:userId/exerciseplans/:exercisePlanId').post(ExercisePlansController.postUserFavoriteExercisePlan);
TraineeProfilesRouter.route('/:userId/exerciseplans/:exercisePlanId').put(ExercisePlansController.updateUserFavoriteExercisePlan);