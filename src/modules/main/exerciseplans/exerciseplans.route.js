import { Router } from "express";
import ExercisePlansController from "./exerciseplans.controller.js"

export const exercisePlansRouter = Router();

exercisePlansRouter.route('/').post(ExercisePlansController.createNewExercisePlan);
exercisePlansRouter.route('/').get(ExercisePlansController.getAvailableExercisePlans);