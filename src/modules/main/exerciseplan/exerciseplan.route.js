import { Router } from "express";
import ExercisePlanController from "./exerciseplan.controller.js"

export const exercisePlanRouter = Router();

exercisePlanRouter.route('/').post(ExercisePlanController.createNewExercisePlan);
exercisePlanRouter.route('/').get(ExercisePlanController.getAvailableExercisePlans);