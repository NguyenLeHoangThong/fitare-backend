import { Router } from "express";
import TrainerProfilesController from "./trainerprofiles.controller.js"

export const TrainerProfilesRouter = Router();

TrainerProfilesRouter.route('/').post(TrainerProfilesController.createNewTrainer);
TrainerProfilesRouter.route('/:id').get(TrainerProfilesController.getAvailableTrainerProfiles);
// TrainerProfilesRouter.route('/:id').put(TrainerProfilesController.updateTrainer);