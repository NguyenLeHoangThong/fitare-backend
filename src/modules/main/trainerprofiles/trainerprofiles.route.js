import { Router } from "express";
import TrainerProfilesController from "./trainerprofiles.controller.js"
import ExercisePlansController from "../exerciseplans/exerciseplans.controller.js"

export const TrainerProfilesRouter = Router();

TrainerProfilesRouter.route('/').post(TrainerProfilesController.createNewTrainer);
TrainerProfilesRouter.route('/:id').get(TrainerProfilesController.getAvailableTrainerProfiles);
TrainerProfilesRouter.route('/:id').put(TrainerProfilesController.updateTrainer);
TrainerProfilesRouter.route('/:id/exerciseplans/created').get(ExercisePlansController.getTrainerCreatedPlans);
TrainerProfilesRouter.route('/:userId/exerciseplans').get(ExercisePlansController.getUserFavoriteExercisePlans);
TrainerProfilesRouter.route('/:userId/exerciseplans/:exercisePlanId').post(ExercisePlansController.postUserFavoriteExercisePlan);
TrainerProfilesRouter.route('/:userId/exerciseplans/:exercisePlanId').put(ExercisePlansController.updateUserFavoriteExercisePlan);