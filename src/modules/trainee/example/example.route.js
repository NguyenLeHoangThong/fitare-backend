import { Router } from "express";
import ExampleController from "./example.controller.js"

export const exampleRouter = Router();

exampleRouter.route('/test').get(ExampleController.exampleAction);