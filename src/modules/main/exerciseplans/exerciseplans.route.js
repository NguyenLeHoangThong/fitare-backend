import { Router } from "express";
import ExercisePlansController from "./exerciseplans.controller.js";
import ExercisesController from "../exercises/exercises.controller.js";

export const exercisePlansRouter = Router();

exercisePlansRouter.route('/').post(ExercisePlansController.createNewExercisePlan);
exercisePlansRouter.route('/').get(ExercisePlansController.getAvailableExercisePlans);
exercisePlansRouter.route('/:id').get(ExercisePlansController.getOneAvailableExercisePlan);
exercisePlansRouter.route('/:id').put(ExercisePlansController.updateExercisePlan);
exercisePlansRouter.route('/:id').delete(ExercisePlansController.deleteExercisePlan);
exercisePlansRouter.route('/:id/censored').put(ExercisePlansController.censoredExercisePlan);
exercisePlansRouter.route('/:id/not-censored').put(ExercisePlansController.notCensoredExercisePlan);
exercisePlansRouter.route('/:exercisePlanId/exercises').get(ExercisesController.getAllExercisesOfAPlan);
exercisePlansRouter.route('/:exercisePlanId/exercises').post(ExercisesController.createExercises);
exercisePlansRouter.route('/:exercisePlanId/exercises').put(ExercisesController.updateExercisesOfAPlan);

