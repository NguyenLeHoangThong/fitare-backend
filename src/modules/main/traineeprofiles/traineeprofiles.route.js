import { Router } from "express";
import TraineeProfilesController from "./traineeprofiles.controller.js"

export const TraineeProfilesRouter = Router();

TraineeProfilesRouter.route('/').post(TraineeProfilesController.createNewTrainee);
TraineeProfilesRouter.route('/:id').get(TraineeProfilesController.getAvailableTraineeProfiles);
TraineeProfilesRouter.route('/:id').put(TraineeProfilesController.updateTrainee);